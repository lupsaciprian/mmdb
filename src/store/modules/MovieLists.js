import Vue from 'vue';
import { INITIAL_STATE, COMPONENT_INITIAL } from './MovieLists.initial';

import axios from '@/api';

export default {
  state: { ...INITIAL_STATE },
  getters: {
    allMovieLists: (state) => state.movieLists,
    allPassiveMovieLists: (state) => state.passiveMovieList,
    allMovieDetailsLists: (state) => state.movieDetailLists,
    searchMovieList: (state) => state.searchResults.search,
    userMovieList: (state) => state.user,

    allPassiveMovieListsArray: (state) =>
      Object.keys(state.passiveMovieList).map(
        (key) => state.passiveMovieList[key]
      ),

    getFromMovieLists: (state) => (listType, id) => state[listType][id],
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

    setMovieDetailsId: (state, payload) => {
      state.movieDetailsId = payload;
    },
  },
  actions: {
    moveFromPassive: ({ commit }, payload) => {
      commit('movePassiveList', payload);
    },
    addOrUpdateMovieLists: ({ commit }, payload) => {
      commit('mutateMovieLists', payload);
    },

    initializeMovieList: ({ commit, dispatch, state }, payload) => {
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
        case 'latestseries':
          // payload :)
          payload.requestUrl = '/tv/airing_today';
          break;
        case 'similar':
          payload.requestUrl = `/movie/${state.movieDetailsId}/similar`;
          break;
        case 'recommended':
          payload.requestUrl = `/movie/${state.movieDetailsId}/recommendations`;
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

    resetMovieProp: ({ commit }, payload) => {
      commit('resetMovieProp', payload);
    },

    setMovieDetailsId: ({ commit, state, dispatch }, payload) => {
      if (state.movieDetailsId && payload !== state.movieDetailsId) {
        // Reset all movie details movie lists
        // The order is important for setMoviesDetailsId!
        commit('setMovieDetailsId', payload);
        Object.keys(state.movieDetailLists).forEach((listKey) => {
          dispatch('initializeMovieList', {
            listType: 'movieDetailLists',
            id: listKey,
          });
        });
      } else {
        commit('setMovieDetailsId', payload);
      }
    },

    getUserMovieLists({ dispatch, state }, payload) {
      Object.keys(state.user).forEach((userMovieListKey) => {
        dispatch('initializeMovieList', {
          listType: 'user',
          id: userMovieListKey,
          paths: { userId: payload.userId },
          params: { session_id: payload.token },
        });
      });
    },
  },
};
