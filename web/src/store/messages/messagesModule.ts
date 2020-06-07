import Vue from 'vue';
import Vuex, { Module } from 'vuex';
import { MessagesStateInterface } from './interfaces';
import actions from './actions';
import mutations from './mutations';
import getters from './getters';

Vue.use(Vuex);

const state: MessagesStateInterface = {
  loadingMessages: false,
  nextPageTokens: {},
  messages: []
};

const messagesModule: Module<MessagesStateInterface, any> = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};

export default messagesModule;
