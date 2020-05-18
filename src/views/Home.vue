<template>
  <div>
    <app-movie-list
      v-for="resource in allMovieLists"
      :key="resource.id"
      :resource="resource"
    />

    <div class="m-5 text-center" v-if="allPassiveMovieListsArray.length > 0">
      <h2>
        Want more? See other categories
      </h2>
      <app-button-toolbar
        @optionSelected="insertNewMovieSection"
        source="home"
        :options="allPassiveMovieListsArray"
        buttonSize="lg"
      />
    </div>
  </div>
</template>

<script>
import MovieListVue from '../components/MovieSection/MovieList.vue';
import ButtonToolbarVue from '../components/ButtonToolbar.vue';

import { mapGetters } from 'vuex';

import { MOVIE_LISTS } from '@/store/storeconstants';

export default {
  name: 'Home',
  components: {
    appMovieList: MovieListVue,
    appButtonToolbar: ButtonToolbarVue,
  },
  computed: {
    ...mapGetters(MOVIE_LISTS, [
      'allMovieLists',
      'allPassiveMovieLists',
      'allPassiveMovieListsArray',
    ]),
  },
  methods: {
    insertNewMovieSection($e) {
      this.$store.dispatch(`${MOVIE_LISTS}/moveFromPassive`, $e);
    },
  },
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
