<template>
  <div class="home">
    <div class="sms-container">
      <div class="number-selection">
        <md-field>
          <label for="twilio-number">
            Select a Twilio to fetch its message histories
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

<script>
import { mapState, createNamespacedHelpers } from 'vuex';
import { NUMBER_ACTION_TYPES } from '@/store/numbers/interfaces';
const {
  mapState: numberMapState,
  mapActions: numberMapAction
} = createNamespacedHelpers('numbers');

export default {
  name: 'sms',
  components: {},
  computed: {
    ...numberMapState(['availableNumbers', 'loadingNumbers']),
    ...mapState(['auth'])
  },
  methods: {
    ...numberMapAction([NUMBER_ACTION_TYPES.FETCH_NUMBERS])
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
  }
};
</script>
