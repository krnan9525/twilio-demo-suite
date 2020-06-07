import Vue from 'vue';
import Vuex from 'vuex';
import { actions, initState, mutations } from '@/store/sharedState';
import numbersModule from '@/store/numbers/numbersModule';

Vue.use(Vuex);

export default new Vuex.Store({
  state: { ...initState },
  mutations: { ...mutations },
  actions: { ...actions },
  modules: { numbers: numbersModule }
});
