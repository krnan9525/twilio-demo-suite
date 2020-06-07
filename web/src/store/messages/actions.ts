import { ActionTree } from 'vuex';
import {
  FetchMessagePayloadInterface,
  FetchMessageResponseInterface,
  MESSAGES_ACTION_TYPES,
  MESSAGES_MUTATION_TYPES,
  MessagesStateInterface
} from '@/store/messages/interfaces';
import Sms from '@/store/network/sms';

const actions: ActionTree<MessagesStateInterface, any> = {
  [MESSAGES_ACTION_TYPES.FETCH_MESSAGES_FOR_NUMBER]: async (
    { commit, state },
    params: FetchMessagePayloadInterface
  ) => {
    commit(MESSAGES_MUTATION_TYPES.SET_LOADING_MESSAGES, true);
    return Sms.getMessagesForNumber(params)
      .then((res: FetchMessageResponseInterface) => {
        commit(MESSAGES_MUTATION_TYPES.APPEND_MESSAGES, res.messages);
        const nextPageTokens = {
          pageToken1: res.nextPageToken1,
          pageToken2: res.nextPageToken2
        };
        commit(MESSAGES_MUTATION_TYPES.SET_LOADING_MESSAGES, false);
        commit(MESSAGES_MUTATION_TYPES.SET_NEXT_PAGE_TOKENS, nextPageTokens);
      })
      .catch(e => {
        commit(MESSAGES_MUTATION_TYPES.SET_LOADING_MESSAGES, false);
        throw e;
      });
  }
};

export default actions;
