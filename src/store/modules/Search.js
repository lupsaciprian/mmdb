import INITIAL_STATE from '@/store/modules/Search.initial';

export default {
  state: { ...INITIAL_STATE },
  getters: {
    searchKeyword: (state) => state.searchKeyword,
    searchMode: (state) => state.mode,
    searchAvailableModes: (state) => state.availableModes,
  },
  mutations: {
    setMode: (state, payload) => {
      state.mode = payload;
    },
    setSearchKeyword: (state, payload) => {
      state.searchKeyword = payload;
    },
  },
  actions: {
    setMode({ commit }, payload) {
      commit('setMode', payload);
    },
    setSearchKeyword({ commit }, payload) {
      commit('setSearchKeyword', payload);
    },
  },
};
