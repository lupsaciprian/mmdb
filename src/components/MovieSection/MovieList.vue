<template>
  <div class="container my-4 animate__animated animate__fadeIn">
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
          :options="movies.options"
          @optionSelected="optionSelected"
        />
      </div>
    </div>

    <div class="h-100">
      <app-message-box
        class="message-box"
        v-if="movies.error"
        type="danger"
      >
        <h4 slot="heading">{{ movies.error.title }}</h4>
        <p slot="details">{{ movies.error.message }}</p>
      </app-message-box>

      <app-message-box
        class="message-box"
        v-else-if="
          !movies.requireOptions &&
            !movies.loading &&
            movies.movies &&
            movies.movies.length === 0
        "
      >
        <h4 slot="heading">
          No movies found for this resource
        </h4>
      </app-message-box>

      <app-message-box
        class="message-box"
        v-else-if="movies.requireOptions"
        type="info"
      >
        <h4 slot="heading">{{ movies.requireOptionsMessage }}</h4>
      </app-message-box>

      <div
        v-else
        class="container movie-container position-relative custom-scrollbar"
        v-scroll="handleScroll"
      >
        <div class="row flex-nowrap ">
          <app-movie
            v-for="movie in movies.movies"
            :movie="movie"
            :key="movie.id"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MovieVue from "./Movie.vue";

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
    appMovie: MovieVue
  },
  computed: {
    movies() {
      const movies = this.$store.getters[`${MOVIE_LISTS}/getFromMovieLists`](
        this.resource.listType,
        this.resource.id
      );
      return movies;
    }
  },
  mounted() {},
  methods: {
    handleScroll($e) {
      // 20 is standard per page number of the TMDB api
      const hasPossbileNextPage =
        this.movies.movies.length === 20 * (this.movies.page - 1);

      if (
        $e.target.scrollWidth - $e.target.scrollLeft < 1200 &&
        hasPossbileNextPage &&
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
.message-box {
  min-height: 350px;
}
</style>
