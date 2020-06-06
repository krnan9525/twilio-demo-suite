<template>
  <form class="input-form" novalidate>
    <md-card class="md-layout-item md-size-50 md-small-size-100">
      <md-card-header>
        <div class="md-title">Twilio Account Info</div>
      </md-card-header>
      <md-card-content>
        <div>
          <md-field>
            <label for="account-sid">Account Sid</label>
            <!--              TODO: add validator             -->
            <md-input
              name="accountSid"
              id="account-sid"
              v-model="accountSidCp"
              @input="update()"
            />
          </md-field>
          <md-field>
            <label for="auth-token">Auth Token</label>
            <!--              TODO: add validator             -->
            <md-input
              name="accessToken"
              id="auth-token"
              type="password"
              v-model="accessTokenCp"
              @input="update()"
            />
          </md-field>
          <md-button class="md-raised md-primary" @click="saveAccountDetails">
            Save
          </md-button>
        </div>
      </md-card-content>
    </md-card>
  </form>
</template>
<script>
export default {
  name: 'AccountDetailForm',
  data() {
    return {
      accessTokenCp: null,
      accountSidCp: null
    };
  },
  props: {
    accessToken: {},
    accountSid: {},
    saveAccountDetails: {}
  },
  methods: {
    update() {
      this.$emit('update', {
        accountSid: this.accountSidCp,
        accessToken: this.accessTokenCp
      });
    }
  },
  watch: {
    accessToken(newValue) {
      this.accessTokenCp = newValue;
    },
    accountSid(newValue) {
      this.accountSidCp = newValue;
    }
  }
};
</script>
<style lang="scss" scoped>
.md-layout-item {
}

.input-form {
  display: flex;
  flex-direction: row;
  justify-content: center;
}
</style>
