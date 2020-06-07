import Vue from 'vue';
import Vuex from 'vuex';
import { actions, initState, mutations } from '@/store/sharedState';
import numbersModule from '@/store/numbers/numbersModule';
import messagesModule from '@/store/messages/messagesModule';

Vue.use(Vuex);

export default new Vuex.Store({
  state: { ...initState },
  mutations: { ...mutations },
  actions: { ...actions },
  modules: { numbers: numbersModule, messages: messagesModule }
});
