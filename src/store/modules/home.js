export default {
  state: {
    movieList: {
      trending: { id: 'trending', name: 'Trending movies' },
      bygenre: { id: 'bygenre', name: 'Movies by genre' },
    },
    passiveMovieList: {
      popular: { id: 'popular', name: 'Popular Movies' },
      toprated: { id: 'toprated', name: 'Top Rated Movies' },
      upcoming: { id: 'upcoming', name: 'Upcoming Movies' },
    },
  },
  getters: {
    getFromMovieList: (state) => (id) => state.movieList[id],
  },
  mutations: {
    mutateMovieList: (state, payload) => {
      console.log(state, payload);
      //   state.movieList[] =
    },
  },
  actions: {
    updateMovieList: ({ commit }, payload) => {
      console.log(commit, payload);
      commit('updateMovieList', payload);
    },
  },
};
