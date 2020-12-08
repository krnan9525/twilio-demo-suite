<template>
  <div>
    <form class="input-form" novalidate>
      <md-card class="md-layout-item md-size-50 md-small-size-100">
        <md-card-header>
          <div class="md-title">Callers Info</div>
        </md-card-header>
        <md-card-content>
          <div>
            <md-field>
              <label for="twilio-number">
                Twilio phone number to initiate the call
              </label>
              <md-select
                name="twilioNumber"
                id="twilio-number"
                v-model="twilioNumber"
              >
                <md-option
                  v-for="(number, key) in activeNumbers"
                  :value="number.number"
                  :key="key"
                >
                  {{ number.friendlyName }}
                </md-option>
              </md-select>
            </md-field>
            <div class="number-or-voip-switch">
              <div v-if="!isUsingVoip" class="__number-container">
                <md-field>
                  <label for="host-number"
                    >Your number to receive the call</label
                  >
                  <!--              TODO: add validator             -->
                  <md-input
                    name="hostNumber"
                    id="host-number"
                    type="number"
                    v-model="hostNumber"
                  />
                </md-field>
              </div>
              <div class="__voip-container">
                <span class="md-body-2"
                  >{{ isUsingVoip ? 'Using' : 'OR using' }} VoIP</span
                >
                <md-checkbox v-model="isUsingVoip"></md-checkbox>
              </div>
            </div>
            <div v-if="isUsingVoip" class="voip-input-container">
              <voip-config-form />
              <voip-source-selection :from-number="twilioNumber || ''" />
            </div>
            <div v-else>
              <md-field>
                <label for="connecting-number">Number you want to call</label>
                <!--              TODO: add validator             -->
                <md-input
                  name="connectingNumber"
                  id="connecting-number"
                  type="number"
                  v-model="connectNumber"
                />
              </md-field>
              <md-button
                class="md-raised md-primary"
                @click="call()"
                :disable="callButtonDisabled"
              >
                Call
              </md-button>
            </div>
          </div>
        </md-card-content>
      </md-card>
    </form>
    <md-snackbar
      md-position="center"
      :md-duration="snackbarDuration"
      :md-active.sync="showSnackbar"
      md-persistent
    >
      <span>{{ snackbarMessage }}</span>
      <md-button class="md-primary" @click="showSnackbar = false">
        Close
      </md-button>
    </md-snackbar>
  </div>
</template>

<script>
import numbers from '@/store/network/numbers';
import pushSubscriber from '@/util/pushSubscriber';
import callsClient from '@/store/network/calls';
import VoipConfigForm from './VoipConfigForm';
import VoipSourceSelection from '@/components/Calls/VoipSourceSelection';

export default {
  name: 'CallRouterInputForm',
  components: { VoipSourceSelection, VoipConfigForm },
  props: {
    accountSid: null,
    accessToken: null
  },
  data() {
    return {
      activeNumbers: [],
      twilioNumber: null,
      hostNumber: null,
      connectNumber: null,
      snackbarMessage: '',
      showSnackbar: false,
      snackbarDuration: 2500,
      callButtonDisabled: false,
      isUsingVoip: false
    };
  },
  mounted: function() {
    this.getActiveNumbers();
  },
  methods: {
    getActiveNumbers() {
      setTimeout(() => {
        numbers
          .getActiveNumbers(this.accountSid, this.accessToken)
          .then(res => {
            this.activeNumbers = res;
            this.snackbarDuration = 2500;
            this.snackbarMessage = 'Twilio numbers are fetched and refreshed.';
            this.showSnackbar = true;
            if (this.activeNumbers && this.activeNumbers.length > 0) {
              this.twilioNumber = this.activeNumbers[0].number;
            }
          })
          .catch(e => {
            // console.log('Error fetching Twilio numbers: ' + e.message);
            this.activeNumbers = [];
            this.snackbarDuration = Infinity;
            this.snackbarMessage = `Error fetching available Twilio numbers. ${
              e.message
                ? 'Error: ' + e.message
                : 'Please check your credentials.'
            }`;
            this.showSnackbar = true;
            this.twilioNumber = null;
          });
      }, 100);
    },
    call() {
      pushSubscriber.getSubscriber().then(res => {
        this.callButtonDisabled = true;
        callsClient
          .forwardCall({
            clientInfo: res
              ? {
                  endpoint: res.endpoint,
                  auth: res.keys.auth,
                  p256dh: res.keys.p256dh
                }
              : null,
            accessToken: this.accessToken,
            accountSid: this.accountSid,
            connectNumber: this.connectNumber,
            hostNumber: this.hostNumber,
            twilioNumber: this.twilioNumber
          })
          .then(callRes => {
            const callSid = callRes.sid;
            this.callButtonDisabled = false;
            this.snackbarDuration = Infinity;
            this.snackbarMessage = `Request is submitted. You will receive a call shortly.${
              callSid ? '\nCall Sid: ' + callSid : ''
            }`;
            this.showSnackbar = true;
          })
          .catch(e => {
            // console.log('Error making the API call: ' + e.message);
            this.callButtonDisabled = false;
            this.snackbarDuration = Infinity;
            this.snackbarMessage = `There is an error connecting your call. ${
              e.message
                ? 'Error: ' + e.message
                : 'Please check Twilio dashboard for more information.'
            }`;
            this.showSnackbar = true;
          });
      });
    }
  }
};
</script>

<style scoped lang="scss">
.input-form {
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.number-or-voip-switch {
  display: flex;
  .__number-container {
    flex: 1;
  }
  .__voip-container {
    min-width: 135px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
}
</style>
