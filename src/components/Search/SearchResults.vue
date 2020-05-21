<template>
  <div class="row">
    <div class="col d-flex justify-content-end align-items-center">
      <app-button-toolbar
        @optionSelected="selectedMode"
        source="home"
        :options="searchAvailableModes"
      />

      <button
        class="btn btn-sm btn-dark mr-1 mb-1"
        @click="close"
      >
        <span aria-hidden="true">&times;</span> Close
      </button>
    </div>
    <div class="col-12 text-left">
      <app-movie-list :resource="searchMovieList" />
    </div>
  </div>
</template>

<script>
import MovieListVue from "@/components/MovieSection/MovieList.vue";

import { MOVIE_LISTS, SEARCH } from "@/store/storeconstants";
import { mapGetters } from "vuex";

export default {
  components: {
    appMovieList: MovieListVue
  },
  computed: {
    ...mapGetters(MOVIE_LISTS, ["searchMovieList"]),
    ...mapGetters(SEARCH, [
      "searchAvailableModes",
      "searchKeyword",
      "searchMode"
    ])
  },
  methods: {
    close() {
      this.$store.dispatch("setActiveDropdown", null);
    },
    selectedMode($e) {
      this.$store.dispatch(`${SEARCH}/setMode`, $e.id);
      this.getSearchResults();
    },
    getSearchResults() {
      console.log(this.searchMovieList);
      this.$store.dispatch(`${MOVIE_LISTS}/getMovieListsByType`, {
        listType: this.searchMovieList.listType,
        params: { query: this.searchKeyword },
        mode: this.searchMode
      });
    }
  },
  mounted() {
    this.getSearchResults();
  }
};
</script>
