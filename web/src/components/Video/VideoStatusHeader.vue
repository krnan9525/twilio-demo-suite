<template>
  <div>
    <div class="video-status-container">
      <div
        v-if="!tokenAuth.apiKey || !tokenAuth.apiSecret"
        class="__no-auth-token"
      >
        <span class="md-subheading">No API KEY is found</span>
        <md-button
          class="md-primary md-raised"
          @click="onGenerateApiKeyClicked()"
          >Generate a new API Key</md-button
        >
      </div>
      <div v-else class="__auth-token-info"></div>
      <div v-if="connected" class="__connected-info">
        <span class="md-subheading">Connected!</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';
import {
  ACTION_TYPES as rootActions,
  MUTATION_TYPES as rootMutations
} from '@/store/sharedState';
import { getTokenAuthFromLocalStorage } from '@/util/localStorage';

export default {
  name: 'video-status-header',
  props: {
    connected: {
      type: Boolean,
      default: false
    },
    duration: {
      type: Number || null,
      default: null
    }
  },
  mounted() {
    this[rootMutations.SET_TOKEN_AUTH](getTokenAuthFromLocalStorage());
  },
  computed: {
    ...mapState(['tokenAuth', 'auth'])
  },
  methods: {
    ...mapMutations([rootMutations.SET_TOKEN_AUTH]),
    ...mapActions([rootActions.GENERATE_API_KEY]),
    onGenerateApiKeyClicked() {
      this[rootActions.GENERATE_API_KEY](this.auth);
    }
  }
};
</script>

<style scoped lang="scss">
.video-status-container {
  width: 100%;
  height: 50px;
  display: flex;
  flex-direction: row;
  .__no-auth-token,
  .__connected-info {
    display: flex;
    align-items: center;
  }
}
</style>
