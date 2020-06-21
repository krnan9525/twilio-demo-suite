<template>
  <div>
    <div class="__send-message-bottom-bar-container">
      <div class="bottom-bar md-size-50 md-small-size-100 md-layout-item">
        <md-button class="md-icon-button md-raised add-media-btn __m-l-2">
          <md-icon>add</md-icon>
        </md-button>
        <md-field class="message-input-field">
          <md-input
            placeholder="Type new message here"
            v-model="inputMessage"
          />
        </md-field>
        <md-button class="md-primary send-btn" @click="onSendClicked()">
          <span class="__text">send </span>
          <md-icon>send</md-icon>
        </md-button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.__send-message-bottom-bar-container {
  background: white;
  position: fixed;
  bottom: 0;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.bottom-bar {
  display: flex;
  flex-direction: row;
  height: 50px;
  align-items: center;
  justify-content: space-around;
}

.message-input-field {
  max-width: 400px;
}

.add-media-btn {
}
</style>

<script>
export default {
  name: 'send-message-bar',
  data() {
    return {
      inputMessage: ''
    };
  },
  mounted() {
    // experiment -- append this component to document body
    const content = this.$el.querySelector(
      '.__send-message-bottom-bar-container'
    );
    if (content) {
      const body = document.querySelector('body');
      content.parentNode.removeChild(content);
      body.appendChild(content);
    }
  },
  beforeDestroy() {
    const toRemove = document.querySelector(
      '.__send-message-bottom-bar-container'
    );
    if (toRemove) {
      toRemove.parentNode.removeChild(toRemove);
    }
  },
  methods: {
    onSendClicked() {
      if (this.inputMessage) {
        this.$emit('send-message', this.inputMessage);
        this.inputMessage = '';
      }
    }
  }
};
</script>
