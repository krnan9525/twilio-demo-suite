<template>
  <div class="home">
    <div class="account-details">
      <AccountDetailHeader />
      <AccountDetailForm
        :access-token="accessToken"
        :account-sid="accountSid"
        :save-account-details="saveAccountDetails"
        @update="formUpdated"
      />
    </div>
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
import AccountDetailHeader from '@/components/HomeHeader';
import AccountDetailForm from '@/components/AccountDetailForm';
import CallRouterInputForm from '@/components/CallRouterInputForm';
import validator from '@/util/validator';

export default {
  name: 'home',
  components: { CallRouterInputForm, AccountDetailForm, AccountDetailHeader },
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
  },
  methods: {
    saveAccountDetails() {
      if (validator.sidValidator(this.accountSid)) {
        localStorage.setItem('accountSid', this.accountSid);
        localStorage.setItem('accessToken', this.accessToken);
        this.$refs.callInputForm.getActiveNumbers();
      } else {
        this.snackbarMessage =
          'The account Sid or auth token format is incorrect. Please try again.';
        this.showSnackbar = true;
      }
    },
    formUpdated({ accountSid, accessToken }) {
      this.accountSid = accountSid;
      this.accessToken = accessToken;
    }
  }
};
</script>
