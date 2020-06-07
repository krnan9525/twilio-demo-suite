import Vue from 'vue';
import Vuex, { Module } from 'vuex';
import { NumberStateInterface } from './interfaces';
import actions from './actions';
import mutations from './mutations';

Vue.use(Vuex);

const state: NumberStateInterface = {
  availableNumbers: [],
  loadingNumbers: false
};

const numbersModule: Module<NumberStateInterface, any> = {
  namespaced: true,
  state,
  mutations,
  actions
};

export default numbersModule;
