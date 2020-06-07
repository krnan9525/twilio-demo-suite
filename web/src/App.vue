<template>
  <div id="app">
    <div class="page-container">
      <md-app id="md-app-container" md-waterfall md-mode="fixed-last">
        <md-app-toolbar class="md-large md-dense md-primary">
          <div class="md-toolbar-row">
            <div class="md-toolbar-section-start">
              <span class="md-title">Call Forwarder</span>
              <auth-connection-indicator
                v-if="isConnected"
                class="connection-indicator"
              />
            </div>
          </div>
          <div v-if="isConnected" class="md-toolbar-row">
            <md-tabs class="md-primary" md-sync-route md-swipeable>
              <md-tab id="tab-home" md-label="Call Forwarding" to="/" exact />
              <md-tab
                id="call-logs"
                md-label="Call Logs"
                to="call-logs"
                exact
              />
              <md-tab id="tab-sms" md-label="SMS" to="sms" exact />
              <md-tab id="tab-about" md-label="About" to="about" />
            </md-tabs>
          </div>
        </md-app-toolbar>
        <md-app-content class="__m-t-3">
          <h2 v-if="loadingAuth">Loading</h2>
          <router-view v-else-if="isConnected" />
          <ConnectionPage v-else />
        </md-app-content>
      </md-app>
    </div>
  </div>
</template>

<style lang="scss" scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.md-toolbar-section-start {
  justify-content: space-between;
}

#md-app-container {
  min-height: 100vh;
}
</style>

<script>
import { mapActions, mapState } from 'vuex';
import { ACTION_TYPES } from '@/store/sharedState';
import { getCredentialFromLocalStorage } from '@/util/localStorage';
import AuthConnectionIndicator from '@/components/Common/AuthConnectionIndicator';
import ConnectionPage from '@/views/ConnectionPage';

export default {
  name: 'app',
  components: { ConnectionPage, AuthConnectionIndicator },
  methods: {
    ...mapActions([ACTION_TYPES.AUTHENTICATE])
  },
  computed: {
    ...mapState(['isConnected', 'loadingAuth'])
  },
  mounted() {
    this[ACTION_TYPES.AUTHENTICATE](getCredentialFromLocalStorage());
  }
};
</script>
