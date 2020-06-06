import Vue from 'vue';
import Vuex from 'vuex';
import { actions, initState, mutations } from '@/store/sharedState';

Vue.use(Vuex);

export default new Vuex.Store({
  state: { ...initState },
  mutations: { ...mutations },
  actions: { ...actions },
  modules: {}
});
