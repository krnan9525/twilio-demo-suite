<template>
  <div class="home">
    <div class="call-router-input-container">
      <CallRouterInputForm
        ref="callInputForm"
        :access-token="auth.accessToken"
        :account-sid="auth.accountSid"
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
import { mapState } from 'vuex';

export default {
  name: 'calls-tab',
  components: { CallRouterInputForm },
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
