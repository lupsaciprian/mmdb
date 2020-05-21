<template>
  <div>
    <app-movie-list
      v-for="resource in homeMovieLists"
      :key="resource.id"
      :resource="resource"
    />

    <div
      class="m-5 text-center"
      v-if="homePassiveMovieListsArray.length > 0"
    >
      <h2>
        Want more? See other categories
      </h2>
      <app-button-toolbar
        @optionSelected="insertNewMovieSection"
        source="home"
        :options="homePassiveMovieListsArray"
        buttonSize="lg"
      />
    </div>
  </div>
</template>

<script>
import MovieListVue from "../components/MovieSection/MovieList.vue";

import { mapGetters } from "vuex";

import { MOVIE_LISTS } from "@/store/storeconstants";

export default {
  name: "Home",
  components: {
    appMovieList: MovieListVue
  },
  computed: {
    ...mapGetters(MOVIE_LISTS, [
      "homeMovieLists",
      "homePassiveMovieLists",
      "homePassiveMovieListsArray"
    ])
  },
  methods: {
    insertNewMovieSection($e) {
      this.$store.dispatch(`${MOVIE_LISTS}/moveToOtherList`, {
        ...$e,
        to: $e.listType
      });
    }
  },
  mounted() {
    this.$store.dispatch(`${MOVIE_LISTS}/getMovieListsByType`, {
      listType: "home"
    });
  }
};
</script>

<style lang="scss" scoped>
.overlay-panel {
  position: fixed;
  top: 70px;
  z-index: 100;
  min-height: 400px;
}
</style>
