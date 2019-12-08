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
        :access-token="accessToken"
        :account-sid="accountSid"
      />
    </div>
  </div>
</template>

<script>
import AccountDetailHeader from '@/components/HomeHeader';
import AccountDetailForm from '@/components/AccountDetailForm';
import CallRouterInputForm from '@/components/CallRouterInputForm';

export default {
  name: 'home',
  components: { CallRouterInputForm, AccountDetailForm, AccountDetailHeader },
  data() {
    return {
      accountSid: null,
      accessToken: null
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
      localStorage.setItem('accountSid', this.accountSid);
      localStorage.setItem('accessToken', this.accessToken);
    },
    formUpdated({ accountSid, accessToken }) {
      this.accountSid = accountSid;
      this.accessToken = accessToken;
    }
  }
};
</script>
