import Vue from "vue";
import Vuex from "vuex";
import {
  MOVIE_LISTS,
  MOVIE_DETAILS,
  SEARCH,
  LOGIN
} from "@/store/storeconstants";

import movieLists from "./modules/MovieLists";
import movieDetails from "./modules/MovieDetail";
import search from "./modules/Search";
import login from "./modules/Login";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    [MOVIE_LISTS]: {
      namespaced: true,
      ...movieLists
    },
    [MOVIE_DETAILS]: {
      namespaced: true,
      ...movieDetails
    },
    [SEARCH]: {
      namespaced: true,
      ...search
    },
    [LOGIN]: {
      namespaced: true,
      ...login
    }
  }
});
