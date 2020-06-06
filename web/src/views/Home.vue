<template>
  <div class="home">
    <div class="call-router-input-container">
      <CallRouterInputForm
        ref="callInputForm"
        :access-token="accessToken"
        :account-sid="accountSid"
      />
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
</template>

<script>
import CallRouterInputForm from '@/components/Home/CallRouterInputForm';

export default {
  name: 'home',
  components: { CallRouterInputForm },
  data() {
    return {
      accountSid: null,
      accessToken: null,
      snackbarMessage: '',
      showSnackbar: false
    };
  },
  mounted: function() {
    const accountSid = localStorage.getItem('accountSid');
    const accessToken = localStorage.getItem('accessToken');
    if (accountSid && accessToken) {
      this.accountSid = accountSid;
      this.accessToken = accessToken;
    }
  }
};
</script>
