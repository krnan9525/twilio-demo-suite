<template>
  <div class="home">
    <div class="sms-container"></div>
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
import { mapState } from 'vuex';

export default {
  name: 'home',
  components: {},
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
