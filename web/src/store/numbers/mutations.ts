import {
  NUMBER_MUTATION_TYPES,
  NumberStateInterface,
  NumberInterface,
  CountryInterface,
  NumberToBuyInterface
} from './interfaces';
import { MutationTree } from 'vuex';

const mutations: MutationTree<NumberStateInterface> = {
  [NUMBER_MUTATION_TYPES.SET_AVAILABLE_NUMBERS](
    state: NumberStateInterface,
    data: NumberInterface[]
  ) {
    state.availableNumbers = data;
  },
  [NUMBER_MUTATION_TYPES.SET_NUMBER_LOADING](
    state: NumberStateInterface,
    data: boolean
  ) {
    state.loadingNumbers = data;
  },
  [NUMBER_MUTATION_TYPES.SET_SMS_SELECTED_NUMBER](
    state: NumberStateInterface,
    data: string
  ) {
    state.smsSelectedNumber = data;
  },
  [NUMBER_MUTATION_TYPES.SET_SMS_RECEIVER_NUMBER](
    state: NumberStateInterface,
    data: string
  ) {
    state.smsReceiverNumber = data;
  },
  [NUMBER_MUTATION_TYPES.SET_COUNTRY_LIST](
    state: NumberStateInterface,
    data: CountryInterface[]
  ) {
    state.countryList = data;
  },
  [NUMBER_MUTATION_TYPES.SET_NUMBERS_TO_BUY](
    state: NumberStateInterface,
    data: NumberToBuyInterface[]
  ) {
    state.numbersToBuy = data;
  },
  [NUMBER_MUTATION_TYPES.SET_LOADING_BUY_NUMBER](
    state: NumberStateInterface,
    data: boolean
  ) {
    state.loadingBuyNumber = data;
  }
};

export default mutations;
