import Vue from 'vue';
import Vuex from 'vuex';
import { MOVIE_LISTS, MOVIE_DETAILS } from '@/store/storeconstants';

import movieLists from './modules/MovieLists';
import movieDetails from './modules/MovieDetail';

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
    [MOVIE_DETAILS]: {
      namespaced: true,
      ...movieDetails,
    },
  },
});
