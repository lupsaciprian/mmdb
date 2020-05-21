// import { MOVIE_LISTS } from '@/store/storeconstants';
import { INITIAL_STATE } from './MovieDetail.initial';

import axios from '@/config/api';

export default {
  state: { ...INITIAL_STATE },
  getters: {
    movie: (state) => {
      return state.movie;
    },
    movieId: (state) => state.movieId,
    loading: (state) => state.loading,
    reviews: (state) => state.reviews,
    reviewsLoading: (state) => state.reviewsLoading,
  },
  mutations: {
    setMovie: (state, payload) => {
      state.movie = payload;
    },
    setLoading: (state, payload) => {
      state.loading = payload;
    },
    setMovieId: (state, payload) => {
      state.movieId = payload;
    },
    setReviews: (state, payload) => {
      state.reviews = payload;
    },
    setReviewsLoading: (state, payload) => {
      state.reviewsLoading = payload;
    },
  },
  actions: {
    getMovieDetails: async ({ commit, dispatch, state }) => {
      commit('setLoading', true);

      try {
        const details = await axios.get(`/movie/${state.movieId}`);
        let data = details.data;

        if (data.release_date) {
          data.release_date = new Date(data.release_date).getFullYear();
        }
        if (data.runtime) {
          if (data.runtime / 60 > 1)
            data.runtime = `${Math.floor(data.runtime / 60)}h ${data.runtime %
              60}min`;
          else data.runtime = `${data.runtime}min`;
        }

        if (data.spoken_languages)
          data.spoken_languages = data.spoken_languages
            .map((language) => language.name)
            .join(', ');

        if (data.production_companies)
          data.production_companies = data.production_companies.slice(0, 4);

        commit('setMovie', data);
        commit('setLoading', false);
        commit('setReviews', []);

        if (state.reviews) dispatch('getMovieDetailsReviews');
      } catch (err) {
        commit('setLoading', false);
      }
    },

    getMovieDetailsReviews: async ({ commit, state }) => {
      commit('setReviewsLoading', true);

      try {
        const reviews = await axios.get(`/movie/${state.movieId}/reviews`);
        commit('setReviews', reviews.data.results);
        commit('setReviewsLoading', false);
      } catch (err) {
        commit('setReviewsLoading', false);
      }
    },

    setMovieDetailId: ({ commit }, payload) => {
      commit('setMovieId', payload);
    },
  },
};
