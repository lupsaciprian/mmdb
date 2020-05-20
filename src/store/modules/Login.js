import axios from '@/config/api';
import INITIAL_STATE from './Login.initial';

export default {
  state: { ...INITIAL_STATE },
  getters: {
    loginLoading: (state) => state.loading,
    loginError: (state) => state.error,
    loginIsLoggedIn: (state) => state.isLoggedIn,
    loginUserData: (state) => state.user,
    loginToken: (state) => state.token,

    loginUserActions: (state) => state.userActions,
    loginUserActionsLeft: (state) =>
      state.userActions.filter((action) => action.id !== 'rate'),
    loginRateAction: (state) =>
      state.userActions.find((action) => action.id === 'rate'),

    loginUserActionsLoading: (state) => state.userActionsLoading,
  },
  mutations: {
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
    resetUserActions(state) {
      state.userActions = [];
      state.userActions = INITIAL_STATE.userActions;
    },
  },
  actions: {
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
      // Process ENV not working :()
      console.log(process.env);
      try {
        let data = await axios.get('/authentication/token/new');
        window.open(
          `https://www.themoviedb.org/authenticate/${data.data.request_token}?redirect_to=https://mmdb-95041.web.app/redirected`
        );
        window.close();
        commit('setLoading', false);
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

    getUser: ({ commit, state }, payload) => {
      if (state.isLoggedIn) return;

      commit('setActive', false);
      commit('setLoading', true);

      return axios
        .get('/account', {
          params: {
            session_id: payload,
          },
        })
        .then(({ data }) => {
          commit('setToken', {
            reset: true,
            token: payload,
          });
          commit('setLoading', false);
          commit('setUser', data);
        })
        .catch((e) => {
          commit('setError', e.response);
        });
    },

    loggedInUserAction: async ({ commit, state }, payload) => {
      let url, body, message;
      switch (payload.action.id) {
        case 'rate':
          url = `/movie/${payload.movieId}/rating`;
          body = {
            value: payload.value,
          };
          message = 'You rated this movie!';
          break;
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
        await axios.post(url, body, {
          params: {
            session_id: state.token,
          },
        });

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

    resetUserActions({ commit }) {
      commit('resetUserActions');
    },
  },
};
