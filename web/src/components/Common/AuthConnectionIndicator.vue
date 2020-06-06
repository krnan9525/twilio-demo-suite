<template>
  <div class="container">
    <div class="icon-container">
      <md-icon id="link-icon">link</md-icon>
      <span>Connected</span>
    </div>
    <md-button
      class="md-raised md-accent"
      id="logout-btn"
      @click="toggleDialog"
    >
      Log Out
    </md-button>
    <md-dialog :md-active.sync="showDialog">
      <md-dialog-title>Confirm to delete</md-dialog-title>
      <div class="dialog-body">
        Are you sure to delete your Twilio credentials? This will remove it from
        your local device. You are still able to fill it in later.
      </div>
      <md-dialog-actions>
        <md-button class="md-primary" @click="toggleDialog()">
          Cancel
        </md-button>
        <md-button class="md-primary" @click="onConfirmClicked">
          OK
        </md-button>
      </md-dialog-actions>
    </md-dialog>
  </div>
</template>

<style lang="scss" scoped>
.container {
  width: 200px;
  height: 50px;
  background: rgba($__primary-colour-light, 0.2);
  padding: 2px;
  display: flex;
  align-content: center;
  flex-direction: row;
  justify-content: space-around;
}
.icon-container {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  font-size: 10px;
}

#link-icon {
  color: white;
}

#logout-btn {
  color: white;
}

.dialog-body {
  margin: 20px 30px;
}
</style>

<script>
import { clearStorage } from '@/util/localStorage';
import { MUTATION_TYPES } from '@/store/sharedState';
import { mapMutations } from 'vuex';

export default {
  name: 'auth-connection-indicator',
  methods: {
    ...mapMutations([MUTATION_TYPES.CLEAR_AUTH]),
    toggleDialog(show = !this.showDialog) {
      this.showDialog = show;
    },
    onConfirmClicked() {
      clearStorage();
      this[MUTATION_TYPES.CLEAR_AUTH]();
      this.toggleDialog(false);
    }
  },
  data() {
    return {
      showDialog: false
    };
  }
};
</script>
