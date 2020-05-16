import Vue from 'vue';
import Vuex from 'vuex';
import { MOVIE_LISTS } from '@/store/storeconstants';

import movieLists from './modules/MovieLists';

console.log(MOVIE_LISTS);

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    [MOVIE_LISTS]: {
      namespaced: true,
      ...movieLists,
    },
  },
});
