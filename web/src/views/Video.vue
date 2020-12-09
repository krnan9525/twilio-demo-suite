<template>
  <div>
    <div class="status-bar">
      <video-status-header
        :connected="isConnected"
        intent="owner"
        :password="password"
      />
    </div>
    <video-chat-body
      @connectedChanged="onConnectedChanged"
      intent="owner"
      @passwordCreated="val => (password = val)"
      @roomCreated="val => (room = val)"
    />
    <invite-link :password="password" :room="room"></invite-link>
  </div>
</template>

<script>
import VideoStatusHeader from '@/components/Video/VideoStatusHeader';
import VideoChatBody from '@/components/Video/VideoChatBody';
import InviteLink from '@/components/Video/InviteLink';

export default {
  name: 'video-tab',
  components: { InviteLink, VideoChatBody, VideoStatusHeader },
  data() {
    return {
      isConnected: false,
      password: '',
      room: null
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
