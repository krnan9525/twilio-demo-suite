<template>
  <div>
    <div class="bottom-bar">
      <md-button class="md-icon-button md-raised add-media-btn __m-l-2">
        <md-icon>add</md-icon>
      </md-button>
      <md-field class="message-input-field">
        <md-input placeholder="Type new message here" v-model="inputMessage" />
      </md-field>
      <md-button class="md-primary send-btn">
        <span class="__text">send </span>
        <md-icon>send</md-icon>
      </md-button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.bottom-bar {
  width: 100%;
  display: flex;
  flex-direction: row;
  height: 50px;
  align-items: center;
  justify-content: space-around;
}

.send-btn {
  .__text {
    line-height: 24px;
  }
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
  }
};
</script>
