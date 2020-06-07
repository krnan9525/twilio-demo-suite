import { ActionTree } from 'vuex';
import {
  NUMBER_ACTION_TYPES,
  NUMBER_MUTATION_TYPES,
  NumberStateInterface
} from '@/store/numbers/interfaces';
import Numbers from '@/store/network/numbers';
import { AuthInterface } from '@/store/sharedState';

const actions: ActionTree<NumberStateInterface, any> = {
  [NUMBER_ACTION_TYPES.FETCH_NUMBERS]: async (
    { commit, state },
    { accountSid, accessToken }: AuthInterface
  ) => {
    if (!state.availableNumbers.length) {
      commit(NUMBER_MUTATION_TYPES.CHANGE_NUMBER_LOADING, true);
      return Numbers.getActiveNumbers(accountSid, accessToken)
        .then(res => {
          commit(NUMBER_MUTATION_TYPES.CHANGE_NUMBER_LOADING, false);
          commit(NUMBER_MUTATION_TYPES.AVAILABLE_NUMBER, res);
        })
        .catch(() => {
          commit(NUMBER_MUTATION_TYPES.CHANGE_NUMBER_LOADING, false);
          throw new Error('wrong detail');
        });
    }
    return Promise.resolve();
  }
};

export default actions;
