<template>
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
          <md-field>
            <label for="host-number">Your number to receive the call</label>
            <!--              TODO: add validator             -->
            <md-input
              name="hostNumber"
              id="host-number"
              type="number"
              v-model="hostNumber"
            />
          </md-field>
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
          <md-button class="md-raised md-primary" @click="call()">
            Call
          </md-button>
        </div>
      </md-card-content>
    </md-card>
  </form>
</template>
<script>
import numbers from '@/util/network/numbers';
import pushSubscriber from '@/util/pushSubscriber';
import calls from '@/util/network/calls';
import endpoints from '@/util/network/endpoints';

export default {
  name: 'CallRouterInputForm',
  props: {
    accountSid: null,
    accessToken: null
  },
  data() {
    return {
      activeNumbers: [],
      twilioNumber: null,
      hostNumber: null,
      connectNumber: null
    };
  },
  mounted: function() {
    // TODO: use event and validator instead
    setTimeout(() => {
      numbers.getActiveNumbers(this.accountSid, this.accessToken).then(res => {
        this.activeNumbers = res;
      });
    }, 1000);
  },
  methods: {
    call() {
      pushSubscriber.getSubscriber().then(res => {
        console.log(res);
        calls
          .forwardCall({
            clientInfo: {
              endpoint: res.endpoint,
              auth: res.keys.auth,
              p256dh: res.keys.p256dh
            },
            accessToken: this.accessToken,
            accountSid: this.accountSid,
            connectNumber: this.connectNumber,
            hostNumber: this.hostNumber,
            twilioNumber: this.twilioNumber
          })
          .then(callRes => {
            console.log(callRes);
          });
      });
    }
  }
};
</script>
<style>
.input-form {
  display: flex;
  flex-direction: row;
  justify-content: center;
}
</style>
