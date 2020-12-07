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
          Select an output device
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
  data() {
    return {
      device: null,
      microphonePermissionGranted: false,
      outputDevicesOptions: [],
      inputDeviceOptions: [],
      selectedOutputDevice: '',
      selectedInputDevice: ''
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
        console.log('No mic connected');
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
        this.device.on('connect', function(conn) {
          console.log('Successfully established call!');
        });
      }, 100);
    },
    onChangeDevice() {
      this.device.audio.ringtoneDevices.set(this.selectedInputDevice);
      this.device.audio.speakerDevices.set(this.selectedOutputDevice);
    },
    createCall(payload) {
      console.log(payload);
      if (this.device) {
        const outgoingConnection = this.device.connect({
          From: payload.from,
          To: payload.to
        });
        outgoingConnection.on('ringing', function() {
          console.log('Ringing...');
        });
      }
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

<style scoped lang="scss"></style>
