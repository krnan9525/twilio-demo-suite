<template>
  <div>
    <div class="voip-info">
      <span class="__info-text md-subheading">
        Voice over IP calls allow you to have phone calls from this browser. To
        use Twilio for VoIP calls, you need to have a TwiML App and access token
        set up. Use the functions below to quickly have these set up
        programmatically. You can always review these changes from Twilio
        console.
      </span>
      <div class="__api-token-container">
        <div v-if="voIpAuth.apiKey && voIpAuth.apiSecret">
          <span class="md-subheading"
            >The API token in use is: {{ voIpAuth.apiKey }}</span
          >
        </div>
        <div v-else>
          <span class="md-subheading">API KEY is not found</span>
        </div>
        <md-button
          class="md-primary md-raised"
          @click="onGenerateApiKeyClicked()"
          >Generate a new API Key</md-button
        >
      </div>
      <div class="__twiMl-container">
        <div v-if="voIpAuth.twiMlAppSid">
          <span class="md-subheading"
            >The TwiML App in use is: {{ voIpAuth.twiMlAppSid }}</span
          >
        </div>
        <div v-else>
          <span class="md-subheading">TwiML APP is not found</span>
        </div>
        <md-button
          class="md-primary md-raised"
          @click="onGenerateTwiMlAppClicked()"
          >Generate a new TwiML APP</md-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';
import {
  MUTATION_TYPES as rootMutations,
  ACTION_TYPES as rootActions
} from '@/store/sharedState';
import { getVoIpDataFromLocalStorage } from '@/util/localStorage';

export default {
  name: 'voip-config-form',
  methods: {
    ...mapMutations([rootMutations.SET_VOIP_AUTH]),
    ...mapActions([
      rootActions.GENERATE_API_KEY,
      rootActions.GENERATE_TWIML_APP
    ]),
    onGenerateApiKeyClicked() {
      this[rootActions.GENERATE_API_KEY](this.auth);
    },
    onGenerateTwiMlAppClicked() {
      this[rootActions.GENERATE_TWIML_APP](this.auth);
    }
  },
  mounted() {
    this[rootMutations.SET_VOIP_AUTH](getVoIpDataFromLocalStorage());
  },
  computed: {
    ...mapState(['auth', 'voIpAuth'])
  }
};
</script>

<style scoped lang="scss">
.voip-info {
  width: 100%;
  margin: 10px 0;
  padding: 0 15px;
  display: flex;
  flex-direction: column;
  .__api-token-container {
    margin: 15px 0;
  }
}
</style>
