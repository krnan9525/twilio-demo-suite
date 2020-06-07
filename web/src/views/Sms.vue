<template>
  <div>
    <div class="sms-inputs">
      <sms-twilio-number-selection
        class="sms-number-selection m-b-3"
        v-model="twilioNumber"
        :available-numbers="availableNumbers"
      />
      <div v-for="number in uniqueNumbers" :key="number">
        <span>{{ number }}</span>
        <div v-for="(message, i) in mappedMessages[number]" :key="i">
          {{ message.body }}
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
</style>

<script>
import { mapState, createNamespacedHelpers } from 'vuex';
import { NUMBER_ACTION_TYPES } from '@/store/numbers/interfaces';
import {
  MESSAGES_ACTION_TYPES,
  MESSAGES_MUTATION_TYPES,
  MESSAGE_GETTER_TYPES
} from '@/store/messages/interfaces';
import SmsTwilioNumberSelection from '@/components/Sms/SmsTwilioNumberSelection';

const {
  mapState: numberMapState,
  mapActions: numberMapAction
} = createNamespacedHelpers('numbers');

const {
  mapState: messagesMapState,
  mapActions: messagesMapAction,
  mapMutations: messagesMapMutation,
  mapGetters: messagesMapGetter
} = createNamespacedHelpers('messages');

export default {
  name: 'sms',
  components: { SmsTwilioNumberSelection },
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
    ...messagesMapAction([MESSAGES_ACTION_TYPES.FETCH_MESSAGES_FOR_NUMBER]),
    ...messagesMapMutation([MESSAGES_MUTATION_TYPES.CLEAR_MESSAGES])
  },
  data() {
    return {
      snackbarMessage: '',
      showSnackbar: false,
      twilioNumber: undefined
    };
  },
  mounted() {
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
    }
  }
};
</script>
