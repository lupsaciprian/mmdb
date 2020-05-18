import { MOVIE_LISTS } from '@/store/storeconstants';
import INITIAL_STATE from '@/store/modules/Search.initial';

export default {
  state: INITIAL_STATE,
  getters: {
    searchKeyword: (state) => state.searchKeyword,
    searchActive: (state) => state.active,
    searchMode: (state) => state.mode,
    searchAvailableModes: (state) => state.availableModes,
  },
  mutations: {
    toggleActive: (state, payload) => {
      state.active = payload;
    },
    setMode: (state, payload) => {
      state.mode = payload;
    },
    setSearchKeyword: (state, payload) => {
      state.searchKeyword = payload;
    },
  },
  actions: {
    toggleActive({ commit }, payload) {
      commit('toggleActive', payload);
    },
    setMode({ commit }, payload) {
      commit('setMode', payload);
    },
    setSearchKeyword({ commit }, payload) {
      commit('setSearchKeyword', payload);
    },

    getSearchMovieList({ dispatch, state }) {
      dispatch(
        `${MOVIE_LISTS}/initializeMovieList`,
        {
          listType: 'searchResults',
          id: 'search',
          params: { query: state.searchKeyword },
          mode: state.mode,
        },
        { root: true }
      );
    },
  },
};
