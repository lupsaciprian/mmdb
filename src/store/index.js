import Vue from 'vue';
import Vuex from 'vuex';
import {
  MOVIE_LISTS,
  MOVIE_DETAILS,
  SEARCH,
  LOGIN,
} from '@/store/storeconstants';

import movieLists from './modules/MovieLists';
import movieDetails from './modules/MovieDetail';
import search from './modules/Search';
import login from './modules/Login';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isMobile: false,
    activeDropdown: null,
  },
  getters: {
    isMobile: (state) => state.isMobile,
    activeDropdown: (state) => state.activeDropdown,
  },
  mutations: {
    setMobile(state) {
      state.isMobile = true;
    },
    setActiveDropdown(state, payload) {
      state.activeDropdown = payload;
    },
  },
  actions: {
    setMobile({ commit }, payload) {
      console.log(payload);
      if (payload < 768) commit('setMobile');
    },
    setActiveDropdown({ commit }, payload) {
      commit('setActiveDropdown', payload);
    },
  },
  modules: {
    [MOVIE_LISTS]: {
      namespaced: true,
      ...movieLists,
    },
    [MOVIE_DETAILS]: {
      namespaced: true,
      ...movieDetails,
    },
    [SEARCH]: {
      namespaced: true,
      ...search,
    },
    [LOGIN]: {
      namespaced: true,
      ...login,
    },
  },
});
