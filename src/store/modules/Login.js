import axios from '@/api';

import INITIAL_STATE from './Login.initial';
import { MOVIE_LISTS } from '@/store/storeconstants';

export default {
  state: INITIAL_STATE,
  getters: {
    loginActive: (state) => state.active,
    loginLoading: (state) => state.loading,
    loginError: (state) => state.error,
    loginIsLoggedIn: (state) => state.isLoggedIn,
    loginUserData: (state) => state.user,
    loginUserActions: (state) => state.userActions,
    loginUserActionsLoading: (state) => state.userActionsLoading,
    loginToken: (state) => state.token,
  },
  mutations: {
    setActive(state, payload) {
      state.active = payload;
    },
    setLoading(state, payload) {
      state.loading = payload;
    },
    setActionsLoading(state, payload) {
      state.userActionsLoading = payload;
    },
    setError(state, payload) {
      state.loading = false;
      state.error = {
        title: payload.data ? `Error! (${payload.data.status_code})` : 'Error!',
        message: payload.data
          ? payload.data.status_message
          : 'There was a problem when logging in.',
      };
    },

    logout: (state) => {
      // Reset whole state to initial state
      state.active = false;
      state.loading = false;
      state.token = null;
      state.error = null;
      state.isLoggedIn = false;
      state.user = null;

      localStorage.removeItem('token');
    },
    setToken(state, payload) {
      state.isLoggedIn = true;
      state.token = payload.token;

      if (payload.reset) localStorage.setItem('token', payload.token);
    },
    setUser(state, payload) {
      state.user = payload;
    },
    updateAction(state, payload) {
      // Simply replacing the payload item with the corresponding action did not trigger change detection
      state.userActions = state.userActions.map((action) =>
        action.id === payload.id ? payload : action
      );
    },
  },
  actions: {
    toggleActive: ({ commit }, payload) => {
      commit('setActive', payload);
    },

    loginByEmail: async ({ commit, dispatch }, payload) => {
      commit('setLoading', true);
      try {
        let data = await axios.get('/authentication/token/new');
        try {
          const loginRequest = await axios.post(
            '/authentication/token/validate_with_login',
            {
              username: payload.username,
              password: payload.password,
              request_token: data.data.request_token,
            }
          );
          commit('setActive', payload);
          commit('setToken', {
            token: loginRequest.data.request_token,
            keepLoggedIn: payload.keepLoggedIn,
          });

          dispatch('getUser', loginRequest.data.request_token);
        } catch (e) {
          commit('setError', e.response);
        }
      } catch (e) {
        if (e) commit('setError', e.response);
      }
    },
    loginByRedirect: async ({ commit }) => {
      commit('setLoading', true);
      try {
        let data = await axios.get('/authentication/token/new');
        window.open(
          `https://www.themoviedb.org/authenticate/${data.data.request_token}?redirect_to=http://localhost:8080/redirected`
        );
        window.close();
      } catch (e) {
        if (e) commit('setError', e.response);
      }
    },

    hasBeenRedirected: async ({ commit, dispatch }, payload) => {
      if (!payload.approved) return;

      commit('setLoading', true);
      try {
        const createSession = await axios.post('/authentication/session/new', {
          request_token: payload.request_token,
        });

        dispatch('getUser', createSession.data.session_id);
      } catch (e) {
        if (e) commit('setError', e.response);
      }
    },

    logout({ commit }) {
      commit('logout');
    },

    autoLogin: ({ dispatch, commit }) => {
      const token = localStorage.getItem('token');
      if (token) {
        commit('setToken', {
          reset: false,
          token,
        });
        dispatch('getUser', token);
      }
    },

    getUser: async ({ commit }, payload) => {
      commit('setActive', false);
      commit('setLoading', true);

      try {
        const response = await axios.get('/account', {
          params: {
            session_id: payload,
          },
        });

        commit('setToken', {
          reset: true,
          token: payload,
        });
        commit('setLoading', false);
        commit('setUser', response.data);
      } catch (e) {
        commit('setError', e.response);
      }
    },

    loggedInUserAction: async ({ commit, state }, payload) => {
      console.log(commit, payload);
      let url, body, message;
      switch (payload.action.id) {
        case 'rate':
          return;
        default:
          url = `/account/${payload.userId}/${payload.action.id}`;
          body = {
            media_type: 'movie',
            media_id: payload.movieId,
            [payload.action.id]: true,
          };
          message = `Added to ${payload.action.id} successfully.`;
      }

      commit('setActionsLoading', true);
      try {
        const response = await axios.post(url, body, {
          params: {
            session_id: state.token,
          },
        });
        console.log(response);
        commit('setActionsLoading', false);
        commit('updateAction', {
          id: payload.action.id,
          name: message,
          disabled: true,
        });
      } catch (e) {
        commit('setActionsLoading', false);
        commit('updateAction', {
          id: payload.action.id,
          name: `Error setting this action.`,
        });
      }
    },

    getUserMovieLists({ dispatch, state }) {
      console.log('GETTERS');
      dispatch(
        `${MOVIE_LISTS}/initializeMovieList`,
        {
          listType: 'user',
          id: 'watchlist',
          paths: { userId: state.user.id },
          params: { session_id: state.token },
        },
        { root: true }
      );
    },
  },
};
