import { ActionTree, MutationTree } from 'vuex';
import Login from '@/store/network/login';
import Voip, { NewTwiMlAppResponseInterface } from '@/store/network/voip';
import { saveVoIpDataToLocalStorage } from '@/util/localStorage';

// states

export interface AuthInterface {
  accountSid: string;
  accessToken: string;
}

export interface TokenAuthInterface {
  apiKey: string;
  apiSecret: string;
}

export interface VoipDataStorageInterface {
  apiKey: string;
  apiSecret: string;
  twiMlAppSid: string;
}

export interface SharedStateInterface {
  isConnected: boolean;
  // loadingAuth only used on the first screen loading when account SID and auth token are set
  loadingAuth: boolean;
  auth: AuthInterface;
  tokenAuth: TokenAuthInterface;
  twiMlAppSid: string;
}

export const initState: SharedStateInterface = {
  isConnected: false,
  loadingAuth: true,
  auth: {
    accountSid: '',
    accessToken: ''
  },
  tokenAuth: {
    apiKey: '',
    apiSecret: ''
  },
  twiMlAppSid: ''
};

// mutations

export const MUTATION_TYPES = {
  SET_AUTH: 'SET_AUTH',
  SET_VOIP_DATA: 'SET_VOIP_DATA',
  SET_TOKEN_AUTH: 'SET_TOKEN_AUTH',
  SET_TWIML_APP_SID: 'SET_TWIML_APP_SID',
  SET_CONNECTED: 'SET_CONNECTED',
  SET_LOADING_AUTH: 'SET_LOADING_AUTH',
  CLEAR_AUTH: 'CLEAR_AUTH'
};

export const mutations: MutationTree<SharedStateInterface> = {
  [MUTATION_TYPES.SET_AUTH](state: SharedStateInterface, data: AuthInterface) {
    state.auth = data;
  },
  [MUTATION_TYPES.SET_TOKEN_AUTH](
    state: SharedStateInterface,
    data: TokenAuthInterface
  ) {
    state.tokenAuth = {
      ...state.tokenAuth,
      apiSecret: data.apiSecret,
      apiKey: data.apiKey
    };
  },
  [MUTATION_TYPES.SET_VOIP_DATA](
    state: SharedStateInterface,
    data: VoipDataStorageInterface
  ) {
    state.twiMlAppSid = data.twiMlAppSid;
    state.tokenAuth = {
      apiSecret: data.apiSecret,
      apiKey: data.apiKey
    };
  },
  [MUTATION_TYPES.SET_TWIML_APP_SID](
    state: SharedStateInterface,
    data: NewTwiMlAppResponseInterface
  ) {
    state.twiMlAppSid = data.sid;
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
  AUTHENTICATE_WITH_ANIMATION: 'AUTHENTICATE_WITH_ANIMATION',
  GENERATE_API_KEY: 'GENERATE_API_KEY',
  GENERATE_TWIML_APP: 'GENERATE_TWIML_APP'
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
  },
  [ACTION_TYPES.GENERATE_API_KEY]: ({ commit, state }, auth: AuthInterface) => {
    Login.generateNewApiKey(auth)
      .then(res => {
        saveVoIpDataToLocalStorage({
          apiKey: res.sid,
          apiSecret: res.secret,
          twiMlAppSid: state.twiMlAppSid
        });
        commit(MUTATION_TYPES.SET_TOKEN_AUTH, {
          apiKey: res.sid,
          apiSecret: res.secret
        });
      })
      .catch(() => {
        // TODO: display network error element
        throw new Error('network error');
      });
  },
  [ACTION_TYPES.GENERATE_TWIML_APP]: (
    { commit, state },
    auth: AuthInterface
  ) => {
    Voip.generateTwiMlApp(auth)
      .then(res => {
        saveVoIpDataToLocalStorage({
          apiKey: state.tokenAuth.apiKey,
          apiSecret: state.tokenAuth.apiSecret,
          twiMlAppSid: res.sid
        });
        commit(MUTATION_TYPES.SET_TWIML_APP_SID, res);
      })
      .catch(() => {
        // TODO: display network error element
        throw new Error('network error');
      });
  }
};
