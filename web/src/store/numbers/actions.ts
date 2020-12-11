import { ActionTree } from 'vuex';
import {
  BuyNumberParamsInterface,
  NUMBER_ACTION_TYPES,
  NUMBER_MUTATION_TYPES,
  NumberStateInterface,
  SearchNumbersToBuyParamsInterface
} from '@/store/numbers/interfaces';
import Numbers from '@/store/network/numbers';
import { AuthInterface } from '@/store/sharedState';

const actions: ActionTree<NumberStateInterface, any> = {
  [NUMBER_ACTION_TYPES.FETCH_NUMBERS]: (
    { commit, state },
    { accountSid, accessToken }: AuthInterface
  ) => {
    if (!state.availableNumbers.length) {
      commit(NUMBER_MUTATION_TYPES.SET_NUMBER_LOADING, true);
      return Numbers.getActiveNumbers(accountSid, accessToken)
        .then(res => {
          commit(NUMBER_MUTATION_TYPES.SET_NUMBER_LOADING, false);
          commit(NUMBER_MUTATION_TYPES.SET_AVAILABLE_NUMBERS, res);
        })
        .catch(() => {
          commit(NUMBER_MUTATION_TYPES.SET_NUMBER_LOADING, false);
          throw new Error('wrong detail');
        });
    }
    return Promise.resolve(state.availableNumbers);
  },
  [NUMBER_ACTION_TYPES.FORCE_FETCH_NUMBERS]: (
    { commit, state },
    { accountSid, accessToken }: AuthInterface
  ) => {
    commit(NUMBER_MUTATION_TYPES.SET_NUMBER_LOADING, true);
    return Numbers.getActiveNumbers(accountSid, accessToken)
      .then(res => {
        commit(NUMBER_MUTATION_TYPES.SET_NUMBER_LOADING, false);
        commit(NUMBER_MUTATION_TYPES.SET_AVAILABLE_NUMBERS, res);
      })
      .catch(() => {
        commit(NUMBER_MUTATION_TYPES.SET_NUMBER_LOADING, false);
        throw new Error('wrong detail');
      });
  },
  [NUMBER_ACTION_TYPES.FETCH_COUNTRIES]: (
    { commit, state },
    { accountSid, accessToken }: AuthInterface
  ) => {
    return Numbers.getCountryList(accountSid, accessToken)
      .then(res => {
        commit(NUMBER_MUTATION_TYPES.SET_COUNTRY_LIST, res);
      })
      .catch(() => {
        throw new Error('error fetching country list');
      });
  },
  [NUMBER_ACTION_TYPES.FETCH_NUMBERS_TO_BUY]: (
    { commit, state },
    {
      accountSid,
      accessToken,
      country,
      type
    }: SearchNumbersToBuyParamsInterface
  ) => {
    commit(NUMBER_MUTATION_TYPES.SET_NUMBERS_TO_BUY, []);
    commit(NUMBER_MUTATION_TYPES.SET_LOADING_NUMBERS_TO_BUY, true);
    return Numbers.getNumbersToBuy(accountSid, accessToken, country, type)
      .then(res => {
        commit(NUMBER_MUTATION_TYPES.SET_NUMBERS_TO_BUY, res);
        commit(NUMBER_MUTATION_TYPES.SET_LOADING_NUMBERS_TO_BUY, false);
      })
      .catch(() => {
        commit(NUMBER_MUTATION_TYPES.SET_LOADING_NUMBERS_TO_BUY, false);
        throw new Error('error fetching numbers to buy');
      });
  },
  [NUMBER_ACTION_TYPES.BUY_NEW_NUMBER]: (
    { commit, state },
    { accountSid, accessToken, number }: BuyNumberParamsInterface
  ) => {
    commit(NUMBER_MUTATION_TYPES.SET_LOADING_BUY_NUMBER, true);
    return Numbers.buyNewNumber(accountSid, accessToken, number)
      .then(() => {
        commit(NUMBER_MUTATION_TYPES.SET_NUMBERS_TO_BUY, []);
        commit(NUMBER_MUTATION_TYPES.SET_LOADING_BUY_NUMBER, false);
      })
      .catch(() => {
        commit(NUMBER_MUTATION_TYPES.SET_LOADING_BUY_NUMBER, false);
        throw new Error(
          'error buying a new number -- you might need to update your Regulatory Bundle in Twilio console.'
        );
      });
  }
};

export default actions;
