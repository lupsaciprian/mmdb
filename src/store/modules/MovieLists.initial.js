export const INITIAL_STATE = {
  movieLists: {
    trending: {
      id: 'trending',
      name: 'Trending movies',
      listType: 'movieLists',
    },
    bygenre: { id: 'bygenre', name: 'Movies by genre', listType: 'movieLists' },
  },
  passiveMovieList: {
    popular: { id: 'popular', name: 'Popular Movies', listType: 'movieLists' },
    toprated: {
      id: 'toprated',
      name: 'Top Rated Movies',
      listType: 'movieLists',
    },
    upcoming: {
      id: 'upcoming',
      name: 'Upcoming Movies',
      listType: 'movieLists',
    },
  },
  movieDetailLists: {
    similar: {
      id: 'similar',
      name: 'Similar movies to this movie',
      listType: 'movieDetailLists',
    },
    recommended: {
      id: 'recommended',
      name: 'Recommended movies for this movie ',
      listType: 'movieDetailLists',
    },
  },
};

export const COMPONENT_INITIAL = {
  loading: false,
  movies: [],
  page: 1,
  requestUrl: null,
};
