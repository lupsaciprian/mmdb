<template>
  <div class="container my-4">
    <div class="container my-2" v-loading="loading">
      <div class="row justify-content-between">
        <h2>{{ resource.name }}</h2>
        <app-button-toolbar
          v-if="options.length > 0"
          class="col-12 col-md-8"
          :class="{ 'box-disabled': loading }"
          v-loading="optionsLoading"
          :options="options"
          @optionSelected="optionSelected"
        />
      </div>
    </div>

    <app-alert v-if="requireSelect" type="info" :text="requireSelectText" />
    <div
      v-else
      class="container movie-container position-relative custom-scrollbar"
      v-scroll="handleScroll"
    >
      <div class="row flex-nowrap">
        <app-movie v-for="movie in data" :movie="movie" :key="movie.id" />
      </div>
    </div>
  </div>
</template>

<script>
import axios from '@/api';

import MovieVue from './Movie.vue';
import ButtonToolbarVue from '../ButtonToolbar.vue';
import AlertVue from '../Alert.vue';

export default {
  props: {
    resource: {
      type: Object,
      required: true,
    },
    meta: {
      type: Object,
    },
  },
  components: {
    appMovie: MovieVue,
    appButtonToolbar: ButtonToolbarVue,
    appAlert: AlertVue,
  },
  data() {
    return {
      loading: false,
      optionsLoading: false,
      type: 'movie',
      timeWindow: 'day',
      data: [],
      options: [],
      page: 1,
      requestUrl: null,
      requireSelect: false,
      requireSelectText: '',
    };
  },
  mounted() {
    switch (this.resource.id) {
      case 'trending':
        this.requestUrl = `/trending/${this.type}/${this.timeWindow}`;
        this.getMovies();
        break;
      case 'bygenre':
        this.optionsLoading = true;
        this.requireSelect = true;
        this.requireSelectText = 'Please select a movie genre first';
        axios.get('/genre/movie/list').then((resp) => {
          this.optionsLoading = false;
          this.options = resp.data.genres;
        });
        break;
      case 'toprated':
        this.requestUrl = '/movie/top_rated';
        this.getMovies();
        break;
      case 'upcoming':
        this.requestUrl = '/movie/upcoming';
        this.getMovies();
        break;
      case 'popular':
        this.requestUrl = '/movie/popular';
        this.getMovies();
        break;
      case 'similar':
        this.requestUrl = `/movie/${this.meta.byId}/similar`;
        this.getMovies();
        break;
      case 'recommended':
        this.requestUrl = `/movie/${this.meta.byId}/recommendations`;
        this.getMovies();
        break;
    }
  },
  methods: {
    reInitializeMovies() {
      this.data = [];
      this.page = 1;
    },
    getMovies() {
      this.loading = true;
      setTimeout(() => {
        axios
          .get(this.requestUrl, {
            params: {
              page: this.page,
            },
          })
          .then((resp) => {
            this.loading = false;
            this.data = [...this.data, ...resp.data.results];
            this.page++;
          })
          .catch((e) => console.log(e));
      }, 1000);
    },
    handleScroll($e) {
      if (
        $e.target.scrollWidth - $e.target.scrollLeft < 1200 &&
        !this.loading &&
        this.page < 5
      ) {
        this.getMovies();
      }
    },
    optionSelected($e) {
      if (this.resource.id === 'bygenre') {
        this.reInitializeMovies();
        this.requestUrl = `/discover/movie?with_genres=${$e.id}`;
        this.getMovies();
        this.requireSelect = false;
      }
    },
  },
};
</script>

<style scoped lang="scss">
.movie-container {
  min-height: 350px;
  max-height: 530px;
  overflow-x: scroll;
}
</style>
