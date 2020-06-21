<template>
  <div>
    <div class="sms-instance-page">
      <div
        class="sms-instance-container md-size-50 md-small-size-100 md-layout-item"
      >
        <md-button class="md-primary back-button" @click="onBackClicked()">
          <md-icon>arrow_back</md-icon>
          <span class="__text"> Back</span>
        </md-button>
        <div v-if="this.twilioNumber" class="messages-body-container">
          <h3>Conversation History</h3>
          <div class="numbers-block">
            <span class="__twilio-number">
              Twilio Number: {{ this.twilioNumber }}
            </span>
            <span v-if="this.receiverNumber" class="__receiver-number">
              With: {{ this.receiverNumber }}
            </span>
            <div v-else class="number-input">
              <md-field>
                <label for="receiver-number">Receiver Number</label>
                <md-input
                  name="receiver-number"
                  id="receiver-number"
                  v-model="receiverNumberInput"
                  type="number"
                />
              </md-field>
              <md-button class="md-raised md-primary" @click="setNumber()">
                SET
              </md-button>
            </div>
          </div>
          <md-button
            v-if="this.receiverNumber"
            class="md-primary refresh-btn"
            @click="refreshAllMessages()"
          >
            <span class="__text">refresh messages </span>
            <md-icon>refresh</md-icon>
          </md-button>
          <div class="message-block">
            <chat-bubble :messages="this.messages" />
          </div>
          <send-message-bar @send-message="onMessageSend" />
        </div>
        <h2 v-else class="__m-t-10">Error: Please return to previous page</h2>
      </div>
      <md-snackbar
        md-position="center"
        :md-duration="2500"
        :md-active.sync="showSnackbar"
        md-persistent
      >
        <span>{{ snackbarMessage }}</span>
        <md-button class="md-primary" @click="showSnackbar = false">
          Close
        </md-button>
      </md-snackbar>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.sms-instance-page {
  width: 100%;
  display: flex;
  justify-content: center;
}

.sms-instance-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
}

.messages-body-container {
  width: 100%;
}

.back-button {
  position: absolute;
  top: 0;
  align-self: flex-start;
  .__text {
    @media screen and (max-width: 600px) {
      display: none;
    }
  }
}

.numbers-block {
  display: flex;
  flex-direction: column;
  .__twilio-number {
    color: $__primary-colour;
  }
  .__receiver-number {
    color: $__accent-colour;
  }
}

.message-block {
  padding-bottom: 50px;
}

.number-input {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>

<script>
import { mapState, createNamespacedHelpers } from 'vuex';
import {
  NUMBER_ACTION_TYPES,
  NUMBER_MUTATION_TYPES
} from '@/store/numbers/interfaces';
import {
  MESSAGES_ACTION_TYPES,
  MESSAGES_MUTATION_TYPES,
  MESSAGE_GETTER_TYPES
} from '@/store/messages/interfaces';
import SmsTwilioNumberSelection from '@/components/Sms/SmsTwilioNumberSelection';
import SmsConversationCard from '@/components/Sms/SmsConversationCard';
import ChatBubble from '@/components/SmsInstance/ChatBubble';
import SendMessageBar from '@/components/SmsInstance/SendMessageBar';

const {
  mapState: numberMapState,
  mapMutations: numberMapMutation
} = createNamespacedHelpers('numbers');

const {
  mapState: messagesMapState,
  mapActions: messagesMapAction,
  mapMutations: messagesMapMutation
} = createNamespacedHelpers('messages');

export default {
  name: 'sms-instance',
  components: { SendMessageBar, ChatBubble },
  computed: {
    ...mapState(['auth']),
    ...numberMapState({
      twilioNumber: 'smsSelectedNumber',
      receiverNumber: 'smsReceiverNumber'
    }),
    ...messagesMapState(['messages'])
  },
  methods: {
    ...messagesMapMutation({
      resetMessageState: MESSAGES_MUTATION_TYPES.RESET_MESSAGE_STATE
    }),
    ...messagesMapAction({
      fetchMessages: MESSAGES_ACTION_TYPES.FETCH_MESSAGES_FOR_NUMBER,
      sendMessage: MESSAGES_ACTION_TYPES.SEND_NEW_MESSAGE
    }),
    ...numberMapMutation({
      changeReceiverNumber: NUMBER_MUTATION_TYPES.CHANGE_SMS_RECEIVER_NUMBER
    }),
    onBackClicked() {
      this.$router.back();
    },
    setNumber() {
      if (this.receiverNumberInput.charAt(0) !== '+') {
        this.receiverNumberInput = '+' + this.receiverNumberInput;
      }
      this.changeReceiverNumber(this.receiverNumberInput);
      this.refreshAllMessages();
    },
    refreshAllMessages() {
      this.resetMessageState();
      if (this.twilioNumber && this.receiverNumber) {
        const params = {
          ...this.auth,
          from: this.twilioNumber,
          to: this.receiverNumber
        };
        this.fetchMessages(params);
      }
    },
    onMessageSend(msg) {
      if (this.twilioNumber && this.receiverNumber && msg) {
        const data = {
          ...this.auth,
          messageBody: msg,
          from: this.twilioNumber,
          to: this.receiverNumber
        };
        this.sendMessage(data).then(() => {
          this.showSnackbar = true;
          this.snackbarMessage = 'Message sent!';
          this.refreshAllMessages();
        });
      } else {
        this.showSnackbar = true;
        this.snackbarMessage = 'Cannot send message -- some fields are missing';
      }
    }
  },
  data() {
    return {
      snackbarMessage: '',
      showSnackbar: false,
      receiverNumberInput: ''
    };
  },
  mounted() {
    this.refreshAllMessages();
  },
  watch: {}
};
</script>
