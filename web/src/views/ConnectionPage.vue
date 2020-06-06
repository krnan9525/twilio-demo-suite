<template>
  <div class="account-details">
    <AccountDetailHeader />
    <AccountDetailForm
      :access-token="accessToken"
      :account-sid="accountSid"
      :save-account-details="saveAccountDetails"
      @update="formUpdated"
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
import AccountDetailHeader from '@/components/ConnectionPage/HomeHeader';
import AccountDetailForm from '@/components/ConnectionPage/AccountDetailForm';
import { mapActions } from 'vuex';
import validator from '@/util/validator';
import { ACTION_TYPES } from '@/store/sharedState';
import { LocalStorageEnums } from '@/common/enums';
import { saveCredentialToLocalStorage } from '@/util/localStorage';

export default {
  name: 'connection-page',
  components: { AccountDetailHeader, AccountDetailForm },
  data() {
    return {
      accountSid: null,
      accessToken: null,
      snackbarMessage: '',
      showSnackbar: false
    };
  },
  methods: {
    ...mapActions([ACTION_TYPES.AUTHENTICATE]),
    formUpdated({ accountSid, accessToken }) {
      this.accountSid = accountSid;
      this.accessToken = accessToken;
    },
    saveAccountDetails() {
      if (validator.sidValidator(this.accountSid)) {
        const authObj = {
          [LocalStorageEnums.SID]: this.accountSid,
          [LocalStorageEnums.TOKEN]: this.accessToken
        };
        this[ACTION_TYPES.AUTHENTICATE](authObj).then(() => {
          saveCredentialToLocalStorage(authObj);
        });
      } else {
        this.snackbarMessage =
          'The account Sid or auth token format is incorrect. Please try again.';
        this.showSnackbar = true;
      }
    }
  }
};
</script>
