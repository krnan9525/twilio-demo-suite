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
    <link-to-code-change-banner
      link="https://www.twilio.com/code-exchange/basic-video-chat"
    />
    <invite-link :password="password" :room="room"></invite-link>
  </div>
</template>

<script>
import VideoStatusHeader from '@/components/Video/VideoStatusHeader';
import VideoChatBody from '@/components/Video/VideoChatBody';
import InviteLink from '@/components/Video/InviteLink';
import LinkToCodeChangeBanner from '@/components/Common/LinkToCodeExchangeBanner';

export default {
  name: 'video-tab',
  components: {
    LinkToCodeChangeBanner,
    InviteLink,
    VideoChatBody,
    VideoStatusHeader
  },
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
