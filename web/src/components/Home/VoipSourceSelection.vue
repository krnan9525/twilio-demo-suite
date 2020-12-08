<template>
  <div>
    <div v-if="isInfoValidated" class="device-selection-container">
      <md-field>
        <label for="outputDevicesOptions">
          Select an output device
        </label>
        <md-select
          name="outputDevicesOptions"
          id="outputDevicesOptions"
          v-model="selectedOutputDevice"
          @change="onChangeDevice()"
        >
          <md-option
            v-for="opt in outputDevicesOptions"
            :key="opt.id"
            :value="opt.id"
          >
            {{ opt.label }}
          </md-option>
        </md-select>
      </md-field>
      <md-field>
        <label for="inputDevicesOptions">
          Select an input device
        </label>
        <md-select
          name="inputDevicesOptions"
          id="inputDevicesOptions"
          v-model="selectedInputDevice"
          @change="onChangeDevice()"
        >
          <md-option
            v-for="opt in inputDeviceOptions"
            :key="opt.id"
            :value="opt.id"
          >
            {{ opt.label }}
          </md-option>
        </md-select>
      </md-field>
      <span class="__info-text md-subheading">
        If you see an 'Unknown Device' error on above selections, please enable
        browser's microphone permission from the site settings.
      </span>
      <md-field>
        <label for="connecting-number">Number you want to call</label>
        <md-input
          name="connectingNumber"
          id="connecting-number"
          type="number"
          v-model="toNumber"
        />
      </md-field>
      <div class="__call-control">
        <span class="__ringing-text md-subheading" v-if="isRinging"
          >Ringing...</span
        >
        <span class="__ringing-text md-subheading" v-if="isConnected"
          >Connected</span
        >
        <md-button
          v-if="!isConnected && !isRinging"
          class="md-raised md-primary"
          @click="createVoipCall()"
          :disable="callButtonDisabled"
        >
          Call
        </md-button>
        <md-button
          v-if="isConnected || isRinging"
          class="md-raised md-accent"
          @click="hungUpVoipCall()"
        >
          Hang up
        </md-button>
      </div>
      <md-snackbar
        md-position="center"
        :md-duration="2500"
        :md-active.sync="showSnackbar"
        md-persistent
      >
        <span>{{ snackbarMessage }}</span>
        <md-button class="md-primary" @click="showSnackbar = false">
          Close
        </md-button>
      </md-snackbar>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';
import {
  MUTATION_TYPES as rootMutations,
  ACTION_TYPES as rootActions
} from '@/store/sharedState';
import Voip from '@/store/network/voip';
import { Device } from 'twilio-client';
import { EventBus } from '@/main';

export default {
  name: 'voip-source-selection',
  props: {
    fromNumber: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      device: null,
      microphonePermissionGranted: false,
      outputDevicesOptions: [],
      inputDeviceOptions: [],
      selectedOutputDevice: '',
      selectedInputDevice: '',
      showSnackbar: false,
      snackbarMessage: '',
      toNumber: '',
      callButtonDisabled: false,
      isConnected: false,
      isRinging: false
    };
  },
  mounted() {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then(() => {
        this.microphonePermissionGranted = true;
      })
      .catch(() => {
        // TODO: add error message
        // console.log('No mic connected');
      });
    EventBus.$on('create-voip-call', payload => this.createCall(payload));
  },
  methods: {
    ...mapMutations([rootMutations.SET_VOIP_AUTH]),
    ...mapActions([
      rootActions.GENERATE_API_KEY,
      rootActions.GENERATE_TWIML_APP
    ]),
    initVoipClient() {
      if (this.isInfoValidated) {
        Voip.getNewClientToken({
          twiMlAppSid: this.voIpAuth.twiMlAppSid,
          apiSecret: this.voIpAuth.apiSecret,
          apiKey: this.voIpAuth.apiKey,
          accountSid: this.auth.accountSid
        }).then(res => {
          this.device = new Device(res.token, {
            codecPreferences: ['opus', 'pcmu'],
            fakeLocalDTMF: true,
            enableRingingState: true
          });
          this.getDeviceOptions();
          this.setListeners();
        });
      }
    },
    getDeviceOptions() {
      setTimeout(() => {
        if (!this.device) {
          return;
        }
        const availableOutputDevices = [];
        this.device.audio.availableOutputDevices.forEach(function(device, id) {
          availableOutputDevices.push({
            id,
            label: device.label
          });
        });

        this.outputDevicesOptions = availableOutputDevices;

        const availableInputDevices = [];
        this.device.audio.availableInputDevices.forEach(function(device, id) {
          availableInputDevices.push({
            id,
            label: device.label
          });
        });

        this.inputDeviceOptions = availableInputDevices;
      }, 500);
    },
    setListeners() {
      setTimeout(() => {
        this.device.on('connect', () => {
          this.isConnected = true;
          this.isRinging = false;
        });
        this.device.on('disconnect', () => {
          this.isConnected = false;
          this.isRinging = false;
        });
      }, 100);
    },
    onChangeDevice() {
      this.device.audio.ringtoneDevices.set(this.selectedInputDevice);
      this.device.audio.speakerDevices.set(this.selectedOutputDevice);
    },
    createVoipCall() {
      if (this.device && this.microphonePermissionGranted) {
        const conn = this.device.connect({
          From: this.fromNumber,
          To: this.toNumber
        });
        conn.on('ringing', () => {
          this.isRinging = true;
          this.isConnected = false;
        });
      } else {
        this.showSnackbar = true;
        this.snackbarMessage =
          'Please check if you have microphone permission granted and try again.';
      }
    },
    hungUpVoipCall() {
      this.device.disconnectAll();
    }
  },
  computed: {
    ...mapState(['auth', 'voIpAuth']),
    isInfoValidated() {
      // TODO: add validation
      return (
        this.voIpAuth.twiMlAppSid &&
        this.voIpAuth.apiSecret &&
        this.voIpAuth.apiKey &&
        this.auth.accountSid
      );
    }
  },
  watch: {
    voIpAuth() {
      this.initVoipClient();
    }
  }
};
</script>

<style scoped lang="scss">
.device-selection-container {
  display: flex;
  flex-direction: column;
  .__call-control {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: center;
  }
}
</style>
