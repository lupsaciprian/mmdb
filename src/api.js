import axios from 'axios';

const apiKey = 'c3814027d61d827c1515790fc7a085c3';

const $axios = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
});

$axios.interceptors.request.use((requestConfig) => {
  if (!requestConfig.params) requestConfig.params = {};

  requestConfig.params = {
    ...requestConfig.params,
    api_key: apiKey,
  };

  return requestConfig;
});

export default $axios;
