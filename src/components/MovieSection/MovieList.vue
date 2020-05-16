<template>
  <div class="container my-4">
    <div
      class="container my-2"
      v-loading="movies.loading"
    >
      <div class="row justify-content-between">
        <h2>{{ movies.name }}</h2>
        <app-button-toolbar
          v-if="movies.options && movies.options.length > 0"
          class="col-12 col-md-8"
          :class="{ 'box-disabled': movies.loading }"
          v-loading="movies.optionsLoading"
          :options="movies.options"
          @optionSelected="optionSelected"
        />
      </div>
    </div>

    <app-alert
      v-if="movies.requireOptions"
      type="info"
      :text="movies.requireOptionsMessage"
    />
    <div
      v-else
      class="container movie-container position-relative custom-scrollbar"
      v-scroll="handleScroll"
    >
      <div class="row flex-nowrap">
        <app-movie
          v-for="movie in movies.movies"
          :movie="movie"
          :key="movie.id"
        />
      </div>
    </div>
  </div>
</template>

<script>
// import axios from "@/api";

import MovieVue from "./Movie.vue";
import ButtonToolbarVue from "../ButtonToolbar.vue";
import AlertVue from "../Alert.vue";

import { MOVIE_LISTS } from "@/store/storeconstants";

export default {
  props: {
    resource: {
      type: Object,
      required: true
    },
    meta: {
      type: Object
    }
  },
  components: {
    appMovie: MovieVue,
    appButtonToolbar: ButtonToolbarVue,
    appAlert: AlertVue
  },
  computed: {
    movies() {
      const movies = this.$store.getters[`${MOVIE_LISTS}/getFromMovieLists`](
        this.resource.id
      );
      return movies;
    }
  },
  mounted() {
    this.$store.dispatch(`${MOVIE_LISTS}/initializeMovieList`, {
      id: this.movies.id,
      listType: this.movies.listType
    });
  },
  methods: {
    handleScroll($e) {
      if (
        $e.target.scrollWidth - $e.target.scrollLeft < 1200 &&
        !this.movies.loading &&
        this.movies.page < 5
      ) {
        this.$store.dispatch(`${MOVIE_LISTS}/populateMovieList`, {
          listType: this.movies.listType,
          id: this.movies.id,
          page: this.movies.page
        });
      }
    },
    optionSelected($e) {
      this.$store.dispatch(`${MOVIE_LISTS}/actionSelected`, {
        listType: this.movies.listType,
        id: this.movies.id,
        option: $e.id,
        page: this.movies.page
      });
    }
  }
};
</script>

<style scoped lang="scss">
.movie-container {
  min-height: 350px;
  max-height: 530px;
  overflow-x: scroll;
}
</style>
