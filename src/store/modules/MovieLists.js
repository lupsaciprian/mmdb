import Vue from 'vue';
import { INITIAL_STATE, COMPONENT_INITIAL } from './MovieLists.initial';

import axios from '@/config/api';

export default {
  state: { ...INITIAL_STATE },
  getters: {
    // Home
    homeMovieLists: (state) => state.home,
    homePassiveMovieLists: (state) => state.homePassive,
    homePassiveMovieListsArray: (state) =>
      Object.keys(state.homePassive).map((key) => state.homePassive[key]),
    // Movie Details
    movieDetailLists: (state) => state.movieDetail,
    //Search
    searchMovieList: (state) => state.searchResults.search,
    // My account/User
    userMovieList: (state) => state.user,

    getFromMovieLists: (state) => (listType, id) => state[listType][id],
  },
  mutations: {
    movePassiveList: (state, payload) => {
      state[payload.to] = {
        ...state[payload.to],
        [payload.id]: { ...payload },
      };

      Vue.delete(state.homePassive, payload.id);
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
    },
    resetMovieProp: (state, payload) => {
      state[payload.listType][payload.id] = {
        ...state[payload.listType][payload.id],
        movies: COMPONENT_INITIAL.movies,
        page: COMPONENT_INITIAL.page,
      };
    },

    setError: (state, payload) => {
      state[payload.listType][payload.id] = {
        ...state[payload.listType][payload.id],
        error: payload.error,
      };
    },
  },
  actions: {
    getMovieListsByType: ({ dispatch, state }, payload) => {
      console.log(payload, state[payload.listType]);
      Object.keys(state[payload.listType]).forEach((listId) => {
        dispatch('initializeMovieList', {
          id: listId,
          ...payload,
        });
      });
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
        case 'top_rated':
        case 'upcoming':
        case 'popular':
          payload.requestUrl = `/movie/${payload.id}`;
          break;
        case 'latestseries':
          // payload :)
          payload.requestUrl = '/tv/airing_today';
          break;
        case 'similar':
        case 'recommendations':
          if (!payload.paths) return;
          payload.requestUrl = `/movie/${payload.paths.movieId}/${payload.id}`;
          break;
        case 'search':
          if (!payload.params) return;
          if (payload.mode === 'movie') payload.requestUrl = '/search/movie';
          if (payload.mode === 'tvseries') payload.requestUrl = '/search/tv';
          break;
        case 'rated':
        case 'watchlist':
        case 'favorite':
          if (!payload.paths || !payload.params) return;
          payload.requestUrl = `/account/${payload.paths.userId}/${payload.id}/movies`;
      }

      commit('initializeMovieList', payload);
      dispatch(`populateMovieList`, payload);
    },

    populateMovieList: async ({ commit, state }, payload) => {
      const { id, listType } = payload;
      const list = state[listType][id];

      const handleError = (err) => {
        commit('setProperty', {
          id,
          listType,
          toUpdate: {
            loading: false,
            error: {
              title: err.response
                ? `Error! (${err.response.data.status_code})`
                : 'Error!',
              message: err.response
                ? err.response.data.status_message
                : 'There was a problem loading this section.',
            },
          },
        });
      };

      commit('setProperty', {
        id,
        listType,
        toUpdate: { loading: true },
      });

      if (!list.requireOptions) {
        let params = {
          ...list.params,
          page: payload.page ? payload.page : list.page,
        };
        try {
          const res = await axios.get(list.requestUrl, {
            params,
          });
          commit('setProperty', {
            id,
            listType,
            toUpdate: {
              loading: false,
              movies: [...list.movies, ...res.data.results],
              page: payload.page + 1,
              error: null,
            },
          });
        } catch (err) {
          handleError(err);
        }
      } else if (list.requireOptions) {
        let url;
        if (id === 'bygenre') url = '/genre/movie/list';

        try {
          const res = await axios.get(url);
          commit('setProperty', {
            id,
            listType,
            toUpdate: {
              loading: false,
              options: [...list.options, ...res.data.genres],
              error: null,
            },
          });
        } catch (err) {
          handleError(err);
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
            requestUrl: `/discover/movie?with_genre=${payload.option}`,
            requireOptions: false,
          },
        });
      }

      dispatch('populateMovieList', payload);
    },

    moveToOtherList: ({ commit, dispatch }, payload) => {
      commit('movePassiveList', payload);
      Vue.delete(payload, payload.to);
      dispatch('getMovieListsByType', payload);
    },

    resetMovieProp: ({ commit }, payload) => {
      commit('resetMovieProp', payload);
    },
  },
};
