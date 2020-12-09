<template>
  <div>
    <div class="status-bar">
      <video-status-header :connected="isConnected" intent="guest" />
    </div>
    <video-chat-body @connectedChanged="onConnectedChanged" intent="guest" />
  </div>
</template>

<script>
import VideoStatusHeader from '@/components/Video/VideoStatusHeader';
import VideoChatBody from '@/components/Video/VideoChatBody';

export default {
  name: 'video-tab',
  components: { VideoChatBody, VideoStatusHeader },
  data() {
    return {
      isConnected: false,
      password: ''
    };
  },
  methods: {
    onConnectedChanged(connected) {
      this.isConnected = connected;
    }
  }
};
</script>

<style scoped lang="scss">
.status-bar {
  display: flex;
  flex-direction: row;
  justify-content: center;
}
</style>
