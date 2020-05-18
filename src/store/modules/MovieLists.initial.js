export const INITIAL_STATE = {
  movieDetailsId: null,
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
    latestseries: {
      id: 'latestseries',
      name: 'Latest TV Series',
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
  searchResults: {
    search: {
      id: 'search',
      name: 'Search results',
      listType: 'searchResults',
    },
  },
};

export const COMPONENT_INITIAL = {
  loading: false,
  movies: [],
  page: 1,
  requestUrl: null,
};
