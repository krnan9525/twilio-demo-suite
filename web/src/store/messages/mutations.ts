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
  [MESSAGES_MUTATION_TYPES.SET_NEXT_PAGE_TOKENS](
    state: MessagesStateInterface,
    data: NextPageTokensInterface
  ) {
    state.nextPageTokens = data;
  }
};

export default mutations;
