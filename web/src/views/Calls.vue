<template>
  <div class="calls">
    <span class="tab-title">Twilio Calls</span>
    <div class="call-router-input-container">
      <CallRouterInputForm
        ref="callInputForm"
        :access-token="auth.accessToken"
        :account-sid="auth.accountSid"
      />
    </div>
    <link-to-code-change-banner
      link="https://www.twilio.com/code-exchange?f=voice&f=serverless&p=1"
    />
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
</template>

<script>
import CallRouterInputForm from '@/components/Calls/CallRouterInputForm';
import { mapState } from 'vuex';
import LinkToCodeChangeBanner from '@/components/Common/LinkToCodeExchangeBanner';

export default {
  name: 'calls-tab',
  components: { LinkToCodeChangeBanner, CallRouterInputForm },
  computed: {
    ...mapState(['auth'])
  },
  data() {
    return {
      snackbarMessage: '',
      showSnackbar: false
    };
  }
};
</script>
