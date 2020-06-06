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
            <md-input
              name="accountSid"
              id="account-sid"
              v-model="accountSidCp"
              @input="update()"
            />
          </md-field>
          <md-field>
            <label for="auth-token">Auth Token</label>
            <md-input
              name="accessToken"
              id="auth-token"
              type="password"
              v-model="accessTokenCp"
              @input="update()"
            />
          </md-field>
          <full-page-reveal-button
            :transition="400"
            @click="onSaveClicked"
            :ease-in="false"
          />
        </div>
      </md-card-content>
    </md-card>
  </form>
</template>

<style lang="scss" scoped>
.md-layout-item {
}

.input-form {
  display: flex;
  flex-direction: row;
  justify-content: center;
}
</style>

<script>
import FullPageRevealButton from '@/components/Common/FullPageRevealButton';

export default {
  name: 'AccountDetailForm',
  components: { FullPageRevealButton },
  data() {
    return {
      accessTokenCp: null,
      accountSidCp: null,
      transitionStage: 0
    };
  },
  props: {
    accessToken: {
      type: String,
      default: ''
    },
    accountSid: {
      type: String,
      default: ''
    },
    saveAccountDetails: () => {}
  },
  methods: {
    update() {
      this.$emit('update', {
        accountSid: this.accountSidCp,
        accessToken: this.accessTokenCp
      });
    },
    onSaveClicked(callback) {
      this.$emit('save', callback);
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
