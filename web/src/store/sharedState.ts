import { ActionTree, MutationTree } from 'vuex';
import Login from '@/store/network/login';

// states

export interface AuthInterface {
  accountSid: string;
  accessToken: string;
}

export interface SharedStateInterface {
  isConnected: boolean;
  // loadingAuth only used on the first screen loading when account SID and auth token are set
  loadingAuth: boolean;
  auth: AuthInterface;
}

export const initState: SharedStateInterface = {
  isConnected: false,
  loadingAuth: true,
  auth: {
    accountSid: '',
    accessToken: ''
  }
};

// mutations

export const MUTATION_TYPES = {
  SET_AUTH: 'SET_AUTH',
  SET_CONNECTED: 'SET_CONNECTED',
  SET_LOADING_AUTH: 'SET_LOADING_AUTH',
  CLEAR_AUTH: 'CLEAR_AUTH'
};

export const mutations: MutationTree<SharedStateInterface> = {
  [MUTATION_TYPES.SET_AUTH](state: SharedStateInterface, data: AuthInterface) {
    state.auth = data;
  },
  [MUTATION_TYPES.SET_CONNECTED](state: SharedStateInterface, data: boolean) {
    state.isConnected = data;
    state.loadingAuth = false;
  },
  [MUTATION_TYPES.SET_LOADING_AUTH](
    state: SharedStateInterface,
    data: boolean
  ) {
    state.loadingAuth = data;
  },
  [MUTATION_TYPES.CLEAR_AUTH](state: SharedStateInterface) {
    state.isConnected = false;
    state.auth = initState.auth;
  }
};

// actions

export const ACTION_TYPES = {
  AUTHENTICATE: 'AUTHENTICATE',
  AUTHENTICATE_WITH_ANIMATION: 'AUTHENTICATE_WITH_ANIMATION'
};

export const actions: ActionTree<SharedStateInterface, any> = {
  [ACTION_TYPES.AUTHENTICATE]: async (
    { commit },
    { accountSid, accessToken }: AuthInterface
  ) => {
    return Login.auth(accountSid, accessToken)
      .then(() => {
        commit(MUTATION_TYPES.SET_AUTH, { accountSid, accessToken });
        commit(MUTATION_TYPES.SET_CONNECTED, true);
      })
      .catch(() => {
        commit(MUTATION_TYPES.SET_CONNECTED, false);
        throw new Error('wrong detail');
      });
  },
  // this function resolves mutations so it can be committed after animations
  [ACTION_TYPES.AUTHENTICATE_WITH_ANIMATION]: async (
    { commit },
    { accountSid, accessToken }: AuthInterface
  ) => {
    return Login.auth(accountSid, accessToken)
      .then(() => {
        return () => {
          commit(MUTATION_TYPES.SET_AUTH, { accountSid, accessToken });
          commit(MUTATION_TYPES.SET_CONNECTED, true);
        };
      })
      .catch(() => {
        commit(MUTATION_TYPES.SET_CONNECTED, false);
        throw new Error('wrong detail');
      });
  }
};
