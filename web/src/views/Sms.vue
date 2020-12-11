<template>
  <div>
    <span class="tab-title">SMS</span>
    <div class="sms-inputs">
      <md-card class="md-layout-item md-size-50 md-small-size-100">
        <md-card-header>
          <div class="md-title">
            Select a Twilio Number
          </div>
        </md-card-header>
        <md-card-content>
          <md-field>
            <label for="twilio-number">
              Select a Twilio to fetch its message history
            </label>
            <md-select
              name="twilioNumber"
              id="twilio-number"
              v-model="twilioNumber"
            >
              <md-option
                v-for="(number, key) in availableNumbers"
                :value="number.number"
                :key="key"
              >
                {{ number.friendlyName }}
              </md-option>
            </md-select>
          </md-field>
        </md-card-content>
      </md-card>
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
    <link-to-code-change-banner
      link="https://www.twilio.com/code-exchange?q=&f=sms&f=serverless"
    />
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
import SmsConversationCard from '@/components/Sms/SmsConversationCard';
import LinkToCodeChangeBanner from '@/components/Common/LinkToCodeExchangeBanner';

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
  components: {
    LinkToCodeChangeBanner,
    SmsConversationCard
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
    this[NUMBER_ACTION_TYPES.FETCH_NUMBERS](this.auth).then(() => {
      if (this.availableNumbers && this.availableNumbers.length > 0) {
        this.twilioNumber = this.availableNumbers[0].number;
      }
    });
  },
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
      changeSelectedNumber: NUMBER_MUTATION_TYPES.SET_SMS_SELECTED_NUMBER,
      changeReceiverNumber: NUMBER_MUTATION_TYPES.SET_SMS_RECEIVER_NUMBER
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
