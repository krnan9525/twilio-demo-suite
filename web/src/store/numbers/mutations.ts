import {
  NUMBER_MUTATION_TYPES,
  NumberStateInterface,
  NumberInterface
} from './interfaces';
import { MutationTree } from 'vuex';

const mutations: MutationTree<NumberStateInterface> = {
  [NUMBER_MUTATION_TYPES.AVAILABLE_NUMBER](
    state: NumberStateInterface,
    data: NumberInterface[]
  ) {
    state.availableNumbers = data;
  },
  [NUMBER_MUTATION_TYPES.CHANGE_NUMBER_LOADING](
    state: NumberStateInterface,
    data: boolean
  ) {
    state.loadingNumbers = data;
  }
};

export default mutations;
