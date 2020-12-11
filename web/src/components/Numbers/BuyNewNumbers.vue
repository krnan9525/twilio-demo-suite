<template>
  <div>
    <md-card class="md-layout-item md-size-75 md-small-size-100 __m-b-4">
      <md-card-header>
        <div class="md-title">Purchase New Twilio Numbers</div>
      </md-card-header>
      <md-card-content>
        <div class="country-selection-container">
          <md-field class="__country-field">
            <label for="countrySelection">
              Select a country to buy the number from
            </label>
            <md-select
              name="countrySelection"
              id="countrySelection"
              v-model="selectedCountry"
            >
              <md-option
                v-for="country in countryList"
                :key="country.countryCode"
                :value="country.countryCode"
              >
                {{ country.country }}
              </md-option>
            </md-select>
          </md-field>
          <md-field class="__type-field">
            <label for="typeSelection">
              Select a type
            </label>
            <md-select
              name="typeSelection"
              id="typeSelection"
              v-model="selectedType"
            >
              <md-option v-for="type in typeOptions" :key="type" :value="type">
                {{ type }}
              </md-option>
            </md-select>
          </md-field>
          <md-button
            class="md-primary md-raised"
            @click="onSearchClicked"
            :disabled="loadingNumbersToBuy"
          >
            {{ loadingNumbersToBuy ? 'searching...' : 'search' }}
          </md-button>
        </div>

        <div
          v-if="numbersToBuy && numbersToBuy.length > 0"
          class="numbers-to-buy-table"
        >
          <md-table>
            <md-table-row>
              <md-table-head>Number</md-table-head>
              <md-table-head>Country</md-table-head>
              <md-table-head>Voice</md-table-head>
              <md-table-head>SMS</md-table-head>
              <md-table-head>MMS</md-table-head>
              <md-table-head>Actions</md-table-head>
            </md-table-row>

            <md-table-row v-for="number in numbersToBuy" :key="number.number">
              <md-table-cell>{{ number.number }}</md-table-cell>
              <md-table-cell>{{ number.isoCountry }}</md-table-cell>
              <md-table-cell>
                <simple-supported-cell :is-supported="number.voiceEnabled" />
              </md-table-cell>
              <md-table-cell>
                <simple-supported-cell :is-supported="number.smsEnabled" />
              </md-table-cell>
              <md-table-cell>
                <simple-supported-cell :is-supported="number.mmsEnabled" />
              </md-table-cell>
              <md-table-cell>
                <md-button
                  class="md-primary md-raised"
                  @click="onBuyClicked(number.number)"
                  :disabled="loadingBuyNumber"
                  >Buy</md-button
                >
              </md-table-cell>
            </md-table-row>
          </md-table>
        </div>
      </md-card-content>
    </md-card>

    <md-snackbar
      md-position="center"
      :md-duration="5000"
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
import { createNamespacedHelpers, mapState } from 'vuex';
import {
  NUMBER_ACTION_TYPES,
  NUMBER_MUTATION_TYPES
} from '@/store/numbers/interfaces';
import SimpleSupportedCell from '@/components/Numbers/SimpleSupportedCell';

const {
  mapState: numberMapState,
  mapActions: numberMapActions,
  mapMutations: numberMapMutation
} = createNamespacedHelpers('numbers');
export default {
  name: 'buy-new-numbers',
  components: { SimpleSupportedCell },
  data() {
    return {
      selectedCountry: null,
      selectedType: null,
      showSnackbar: false,
      snackbarMessage: ''
    };
  },
  mounted() {
    this[NUMBER_ACTION_TYPES.FETCH_COUNTRIES](this.auth);
    this[NUMBER_MUTATION_TYPES.CLEAR_NUMBERS_TO_BUY]();
  },
  computed: {
    ...mapState(['auth']),
    ...numberMapState([
      'countryList',
      'numbersToBuy',
      'loadingBuyNumber',
      'loadingNumbersToBuy'
    ]),
    typeOptions() {
      if (!this.selectedCountry) {
        return [];
      }
      const selectedCountryObj = this.countryList.find(
        country => country.countryCode === this.selectedCountry
      );
      return selectedCountryObj ? selectedCountryObj.supportedTypes : [];
    }
  },
  methods: {
    ...numberMapActions([
      NUMBER_ACTION_TYPES.FETCH_COUNTRIES,
      NUMBER_ACTION_TYPES.FORCE_FETCH_NUMBERS,
      NUMBER_ACTION_TYPES.FETCH_NUMBERS_TO_BUY,
      NUMBER_ACTION_TYPES.BUY_NEW_NUMBER
    ]),
    ...numberMapMutation([NUMBER_MUTATION_TYPES.CLEAR_NUMBERS_TO_BUY]),
    onSearchClicked() {
      if (this.selectedCountry && this.selectedType) {
        this[NUMBER_ACTION_TYPES.FETCH_NUMBERS_TO_BUY]({
          ...this.auth,
          country: this.selectedCountry,
          type: this.selectedType
        });
      } else {
        this.showSnackbar = true;
        this.snackbarMessage =
          'You need to select country and number type first.';
      }
    },
    onBuyClicked(number) {
      if (!number) {
        this.showSnackbar = true;
        this.snackbarMessage = 'Wrong phone number is selected.';
        return;
      }
      this[NUMBER_ACTION_TYPES.BUY_NEW_NUMBER]({ ...this.auth, number })
        .then(() => {
          this[NUMBER_ACTION_TYPES.FORCE_FETCH_NUMBERS](this.auth);
          this.showSnackbar = true;
          this.snackbarMessage = `You have bought a new Twilio Number: ${number}`;
        })
        .catch(e => {
          this.showSnackbar = true;
          this.snackbarMessage =
            e.message || 'something went wrong, please try again later';
        });
    }
  },
  watch: {
    selectedCountry(newValue, oldValue) {
      if (newValue !== oldValue) {
        this.selectedType = '';
      }
    }
  }
};
</script>

<style scoped lang="scss">
.country-selection-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
  justify-content: space-evenly;
}
.__type-field {
  max-width: 150px;
}
.__country-field {
  max-width: 400px;
}

/deep/ .numbers-to-buy-table {
  text-align: left;
}
</style>
