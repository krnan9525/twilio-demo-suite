<template>
  <div>
    <div class="conversation __m-2 __p-2">
      <div class="sms-header">
        <md-icon>message</md-icon>
        Conversation with: <span class="sms-number">{{ number }}</span>
      </div>
      <div
        v-for="(message, i) in messages.slice(0, 3)"
        :key="i"
        class="message-cell __p-t-1 __p-b-1"
      >
        <div class="left-info __m-r-2">
          <div class="direction-text">
            <div v-if="message.direction === 'inbound'" class="inbound-text">
              Received{{ ' ' }}
            </div>
            <div v-else class="outbound-text">Sent{{ ' ' }}</div>
          </div>
          <span class="time-text">{{ message.formattedDate }}</span>
        </div>
        <div class="right-body">
          {{ message.body }}
        </div>
      </div>
      <div v-if="messages.length > 3" class="more-message-text">
        <span>and {{ messages.length - 3 }} more...</span>
      </div>
      <div class="actions">
        <md-button class="md-raised md-primary" @click="openConversation()">
          Open
        </md-button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.conversation {
  display: flex;
  flex-direction: column;
  background: #eee;
  border-radius: 5px;
}

.sms-header {
  align-self: start;
}

.sms-number {
  color: $__primary-colour;
}

.message-cell {
  display: flex;
  flex-direction: row;
  border-bottom: 1px solid $__divider-colour;
}

.direction-text {
  line-height: 10px;
  font-size: 10px;
}

.inbound-text {
  color: $__primary-colour;
}

.outbound-text {
  color: $__accent-colour;
}

.left-info {
  min-width: 120px;
  font-size: 10px;
  display: flex;
  height: 100%;
  justify-content: flex-end;
  flex-direction: column;
  align-items: flex-end;
}

.right-body {
  font-size: 12px;
  text-align: left;
}

.time-text {
  font-size: 10px;
  line-height: 10px;
}

.more-message-text {
  color: $__primary-colour;
}

.actions {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
}
</style>

<script>
import moment from 'moment';
export default {
  name: 'sms-conversation-card',
  props: {
    number: {
      type: String,
      required: true
    },
    messages: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    openConversation() {}
  }
};
</script>
