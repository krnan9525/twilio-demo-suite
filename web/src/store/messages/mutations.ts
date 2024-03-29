import {
  MessagesStateInterface,
  MessageInterface,
  MESSAGES_MUTATION_TYPES,
  NextPageTokensInterface
} from './interfaces';
import { MutationTree } from 'vuex';

const mutations: MutationTree<MessagesStateInterface> = {
  [MESSAGES_MUTATION_TYPES.APPEND_MESSAGES](
    state: MessagesStateInterface,
    data: MessageInterface[]
  ) {
    state.messages = state.messages.concat(data);
  },
  [MESSAGES_MUTATION_TYPES.CLEAR_MESSAGES](state: MessagesStateInterface) {
    state.messages = [];
  },
  [MESSAGES_MUTATION_TYPES.SET_LOADING_MESSAGES](
    state: MessagesStateInterface,
    data: boolean
  ) {
    state.loadingMessages = data;
  },
  [MESSAGES_MUTATION_TYPES.SET_SENDING_MESSAGE](
    state: MessagesStateInterface,
    data: boolean
  ) {
    state.sendingMessage = data;
  },
  [MESSAGES_MUTATION_TYPES.SET_NEXT_PAGE_TOKENS](
    state: MessagesStateInterface,
    data: NextPageTokensInterface
  ) {
    state.nextPageTokens = data;
  },
  [MESSAGES_MUTATION_TYPES.RESET_MESSAGE_STATE](state: MessagesStateInterface) {
    state.nextPageTokens = {};
    state.loadingMessages = false;
    state.messages = [];
  }
};

export default mutations;
