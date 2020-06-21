import { ActionTree } from 'vuex';
import {
  CreateSmsPayloadInterface,
  CreateSmsResponseInterface,
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
  },
  [MESSAGES_ACTION_TYPES.SEND_NEW_MESSAGE]: async (
    { commit, state },
    data: CreateSmsPayloadInterface
  ) => {
    commit(MESSAGES_MUTATION_TYPES.SET_SENDING_MESSAGE, true);
    return Sms.sendNewMessage(data)
      .then((res: CreateSmsResponseInterface) => {
        commit(MESSAGES_MUTATION_TYPES.SET_SENDING_MESSAGE, false);
      })
      .catch(e => {
        commit(MESSAGES_MUTATION_TYPES.SET_SENDING_MESSAGE, false);
        throw e;
      });
  }
};

export default actions;
