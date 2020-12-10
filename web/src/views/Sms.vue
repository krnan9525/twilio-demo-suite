<template>
  <div>
    <span class="tab-title">SMS</span>
    <div class="sms-inputs">
      <sms-twilio-number-selection
        class="sms-number-selection m-b-3"
        v-model="twilioNumber"
        :available-numbers="availableNumbers"
      />
    </div>
    <div class="sms-conversations-container __m-t-2">
      <div
        class="conversations md-layout-item md-size-50 md-small-size-100 __default-box-shadow"
      >
        <div v-for="number in uniqueNumbers" :key="number">
          <sms-conversation-card
            :number="number"
            :messages="mappedMessages[number]"
          />
        </div>
        <div v-if="twilioNumber" class="actions">
          <md-button
            class="md-raised md-primary"
            @click="onNewConversationClicked()"
          >
            New Conversation
          </md-button>
        </div>
      </div>
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
</template>

<style lang="scss" scoped>
.sms-inputs {
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.sms-conversations-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.conversations {
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

const {
  mapState: numberMapState,
  mapActions: numberMapAction,
  mapMutations: numberMapMutation
} = createNamespacedHelpers('numbers');

const {
  mapState: messagesMapState,
  mapActions: messagesMapAction,
  mapMutations: messagesMapMutation,
  mapGetters: messagesMapGetter
} = createNamespacedHelpers('messages');

export default {
  name: 'sms',
  components: { SmsConversationCard, SmsTwilioNumberSelection },
  computed: {
    ...numberMapState(['availableNumbers', 'loadingNumbers']),
    ...mapState(['auth']),
    ...messagesMapState(['messages']),
    ...messagesMapGetter({
      uniqueNumbers: MESSAGE_GETTER_TYPES.UNIQUE_NUMBERS,
      mappedMessages: MESSAGE_GETTER_TYPES.MAPPED_MESSAGES
    })
  },
  methods: {
    ...numberMapAction([NUMBER_ACTION_TYPES.FETCH_NUMBERS]),
    ...numberMapMutation({
      changeSelectedNumber: NUMBER_MUTATION_TYPES.CHANGE_SMS_SELECTED_NUMBER,
      changeReceiverNumber: NUMBER_MUTATION_TYPES.CHANGE_SMS_RECEIVER_NUMBER
    }),
    ...messagesMapAction([MESSAGES_ACTION_TYPES.FETCH_MESSAGES_FOR_NUMBER]),
    ...messagesMapMutation([
      MESSAGES_MUTATION_TYPES.CLEAR_MESSAGES,
      MESSAGES_MUTATION_TYPES.RESET_MESSAGE_STATE
    ]),
    onNewConversationClicked() {
      this.changeReceiverNumber('');
      this.$router.push({
        name: 'sms-instance',
        params: { fromNumber: this.twilioNumber }
      });
    }
  },
  data() {
    return {
      snackbarMessage: '',
      showSnackbar: false,
      twilioNumber: undefined
    };
  },
  mounted() {
    this[MESSAGES_MUTATION_TYPES.RESET_MESSAGE_STATE]();
    this[NUMBER_ACTION_TYPES.FETCH_NUMBERS](this.auth);
  },
  watch: {
    twilioNumber(newValue) {
      this[MESSAGES_MUTATION_TYPES.CLEAR_MESSAGES]();
      const params = {
        ...this.auth,
        from: newValue
      };
      this[MESSAGES_ACTION_TYPES.FETCH_MESSAGES_FOR_NUMBER](params);
      this.changeSelectedNumber(newValue);
    }
  }
};
</script>
