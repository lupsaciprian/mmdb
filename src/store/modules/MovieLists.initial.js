export const INITIAL_STATE = {
  home: {
    trending: {
      id: 'trending',
      name: 'Trending movies',
      listType: 'home',
    },
    bygenre: { id: 'bygenre', name: 'Movies by genre', listType: 'home' },
  },
  homePassive: {
    popular: { id: 'popular', name: 'Popular Movies', listType: 'home' },
    top_rated: {
      id: 'top_rated',
      name: 'Top Rated Movies',
      listType: 'home',
    },
    upcoming: {
      id: 'upcoming',
      name: 'Upcoming Movies',
      listType: 'home',
    },
    latestseries: {
      id: 'latestseries',
      name: 'Latest TV Series',
      listType: 'home',
    },
  },
  movieDetail: {
    similar: {
      id: 'similar',
      name: 'Similar movies to this movie',
      listType: 'movieDetail',
    },
    recommendations: {
      id: 'recommendations',
      name: 'Recommended movies for this movie ',
      listType: 'movieDetail',
    },
  },
  searchResults: {
    search: {
      id: 'search',
      name: 'Search results',
      listType: 'searchResults',
    },
  },
  user: {
    rated: {
      id: 'rated',
      name: 'Movies rated by you',
      listType: 'user',
    },
    watchlist: {
      id: 'watchlist',
      name: 'Movies in your watchlist',
      listType: 'user',
    },
    favorite: {
      id: 'favorite',
      name: 'Your favorite movies',
      listType: 'user',
    },
  },
};

export const COMPONENT_INITIAL = {
  loading: false,
  movies: [],
  page: 1,
  requestUrl: null,
};
