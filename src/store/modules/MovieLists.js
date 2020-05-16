import Vue from 'vue';
import { INITIAL_STATE, COMPONENT_INITIAL } from './MovieLists.initial';

import axios from '@/api';

export default {
  state: INITIAL_STATE,
  getters: {
    allMovieLists: (state) => state.movieLists,
    allPassiveMovieLists: (state) => state.passiveMovieList,
    allMovieDetailsLists: (state) => state.movieDetailLists,

    allPassiveMovieListsArray: (state) =>
      Object.keys(state.passiveMovieList).map(
        (key) => state.passiveMovieList[key]
      ),

    getFromMovieLists: (state) => (id) => state.movieLists[id],
  },
  mutations: {
    mutateMovieLists: (state, payload) => {
      state.movieList = { ...state.movieList, ...payload };
    },
    mutateMovieList: (state, payload) => {
      state.movieList[payload.id] = {
        ...state.movieList[payload.id],
        ...payload,
      };
    },
    movePassiveList: (state, payload) => {
      state.movieLists = {
        ...state.movieLists,
        [payload.id]: { ...payload },
      };

      // Using normal JS delete doesnt trigger the allPassiveMovieListArray getter change detection
      Vue.delete(state.passiveMovieList, payload.id);
    },

    initializeMovieList: (state, payload) => {
      state[payload.listType][payload.id] = {
        ...state[payload.listType][payload.id],
        ...payload,
      };
    },
    setProperty: (state, payload) => {
      state[payload.listType][payload.id] = {
        ...state[payload.listType][payload.id],
        ...payload.toUpdate,
      };
      console.log('Updated', state[payload.listType][payload.id]);
    },
    resetMovieProp: (state, payload) => {
      state[payload.listType][payload.id] = {
        ...state[payload.listType][payload.id],
        movies: COMPONENT_INITIAL.movies,
        page: COMPONENT_INITIAL.page,
      };
    },
  },
  actions: {
    moveFromPassive: ({ commit }, payload) => {
      commit('movePassiveList', payload);
    },
    addOrUpdateMovieLists: ({ commit }, payload) => {
      commit('mutateMovieLists', payload);
    },

    initializeMovieList: ({ commit, dispatch }, payload) => {
      payload = { ...payload, ...COMPONENT_INITIAL };

      switch (payload.id) {
        case 'trending':
          payload.requestUrl = `/trending/movie/day`;
          break;
        case 'bygenre':
          payload.options = [];
          payload.requireOptions = true;
          payload.requireOptionsMessage = 'Please select an option first';
          break;
        case 'toprated':
          payload.requestUrl = '/movie/top_rated';
          break;
        case 'upcoming':
          payload.requestUrl = '/movie/upcoming';
          break;
        case 'popular':
          payload.requestUrl = '/movie/popular';
          break;
        case 'similar':
          // /movie/${payload.meta.byId}/similar
          payload.paramsRequired = true;
          break;
        case 'recommended':
          // /movie/${payload.meta.byId}/recommendations
          payload.paramsRequired = true;
          break;
      }

      commit('initializeMovieList', payload);
      dispatch(`populateMovieList`, payload);
    },

    populateMovieList: async ({ commit, state }, payload) => {
      const { id, listType } = payload;
      const list = state[listType][id];

      if (!list.requireOptions && !list.requireParams) {
        commit('setProperty', {
          id,
          listType,
          toUpdate: { loading: true },
        });

        try {
          const res = await axios.get(list.requestUrl, {
            params: { page: payload.page },
          });
          commit('setProperty', {
            id,
            listType,
            toUpdate: {
              loading: false,
              movies: [...list.movies, ...res.data.results],
              page: payload.page + 1,
            },
          });
        } catch (err) {
          console.log(err);
        }
      } else if (list.requireOptions) {
        commit('setProperty', {
          id,
          listType,
          toUpdate: { optionsLoading: true },
        });

        let url;
        if (id === 'bygenre') url = '/genre/movie/list';

        try {
          const res = await axios.get(url);
          commit('setProperty', {
            id,
            listType,
            toUpdate: {
              optionsLoading: false,
              options: [...list.options, ...res.data.genres],
            },
          });
        } catch (err) {
          console.log(err);
        }
      }
    },

    actionSelected: async ({ commit, dispatch }, payload) => {
      dispatch('resetMovieProp', payload);
      const { id, listType } = payload;

      if (payload.id === 'bygenre') {
        commit('setProperty', {
          id,
          listType,
          toUpdate: {
            requestUrl: `/discover/movie?with_genres=${payload.option}`,
            requireOptions: false,
          },
        });
      }

      dispatch('populateMovieList', payload);
    },

    resetMovieProp: ({ commit }, payload) => {
      commit('resetMovieProp', payload);
    },
  },
};
