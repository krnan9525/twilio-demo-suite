<template>
  <div id="app">
    <div class="page-container">
      <md-app md-waterfall md-mode="fixed-last">
        <md-app-toolbar class="md-large md-dense md-primary">
          <div class="md-toolbar-row">
            <div class="md-toolbar-section-start">
              <span class="md-title">Call Forwarder</span>
            </div>
          </div>
          <div class="md-toolbar-row">
            <md-tabs class="md-primary" md-sync-route md-swipeable>
              <md-tab id="tab-home" md-label="Call Forwarding" to="/" exact />
              <md-tab
                id="call-logs"
                md-label="Call Logs"
                to="call-logs"
                exact
              />
              <md-tab id="about" md-label="About" to="about" />
            </md-tabs>
          </div>
        </md-app-toolbar>
        <md-app-content>
          <router-view />
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
</style>
