<template>
  <div>
    <div
      v-for="(thread, i) in formattedThread"
      class="messages"
      :class="{ sent: !thread.isReceived, received: thread.isReceived }"
      :key="i"
    >
      <div
        v-for="(message, j) in thread.messages"
        class="message"
        :class="{ last: j === thread.messages.length - 1 }"
        :key="j"
      >
        {{ message.body }}
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.messages {
  margin-top: 30px;
  display: flex;
  flex-direction: column;
}

.message {
  border-radius: 20px;
  padding: 8px 15px;
  margin-top: 5px;
  margin-bottom: 5px;
  display: inline-block;
  color: white;
}

.received {
  align-items: flex-start;
}

.received .message {
  margin-right: 25%;
  background: linear-gradient($__accent-colour, $__accent-colour-dark) fixed;
  position: relative;
  text-align: start;
}

.received .message.last:before {
  content: '';
  position: absolute;
  z-index: 0;
  bottom: 0;
  left: -7px;
  height: 20px;
  width: 20px;
  background: linear-gradient($__accent-colour, $__accent-colour-dark) fixed;
  border-bottom-right-radius: 15px;
}
.received .message.last:after {
  content: '';
  position: absolute;
  z-index: 1;
  bottom: 0;
  left: -10px;
  width: 10px;
  height: 20px;
  background: white;
  border-bottom-right-radius: 10px;
}

.sent {
  align-items: flex-end;
}

.sent .message {
  color: white;
  margin-left: 25%;
  background: linear-gradient($__primary-colour, $__primary-colour-dark) fixed;
  position: relative;
  text-align: end;
}

.sent .message.last:before {
  content: '';
  position: absolute;
  z-index: 0;
  bottom: 0;
  right: -8px;
  height: 20px;
  width: 20px;
  background: linear-gradient($__primary-colour, $__primary-colour-dark) fixed;
  border-bottom-left-radius: 15px;
}

.sent .message.last:after {
  content: '';
  position: absolute;
  z-index: 1;
  bottom: 0;
  right: -10px;
  width: 10px;
  height: 20px;
  background: white;
  border-bottom-left-radius: 10px;
}
</style>

<script>
export default {
  name: 'chat-bubble',
  props: {
    messages: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    // map raw message array to [{isReceived: boolean, messages: []},...], separating by message directions
    formattedThread() {
      return this.messages.reduce((prev, curr) => {
        const isReceived = curr.direction === 'inbound';
        if (
          prev.length !== 0 &&
          isReceived === prev[prev.length - 1].isReceived
        ) {
          prev[prev.length - 1].messages.push(curr);
        } else {
          prev.push({
            isReceived,
            messages: [curr]
          });
        }
        return prev;
      }, []);
    }
  }
};
</script>
