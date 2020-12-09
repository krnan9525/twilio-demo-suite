<template>
  <div>
    <div v-if="room" class="share-link-component">
      <span class="md-body-1">Share this link to let others to join: </span>
      <span class="md-caption">{{ shareLink }}</span>
    </div>
  </div>
</template>

<script>
import endpoints from '@/store/network/endpoints';

export default {
  name: 'invite-link',
  props: {
    room: {
      type: String || null,
      default: null
    },
    password: {
      type: String || null,
      default: null
    }
  },
  computed: {
    shareLink() {
      return `${endpoints.webLocation}/#/video/invite/${this.room}?password=${this.password}`;
    }
  }
};
</script>

<style scoped lang="scss"></style>
