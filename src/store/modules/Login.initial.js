export default {
  active: false,
  loading: false,
  token: null,
  error: null,
  isLoggedIn: false,
  user: null,
  userActionsLoading: false,
  userActions: [
    {
      id: 'rate',
      name: 'Rate this movie',
    },
    {
      id: 'watchlist',
      name: 'Add to watchlist',
    },
    {
      id: 'favorite',
      name: 'Add to favorites',
    },
  ],
};
