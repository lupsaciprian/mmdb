<template>
  <div class="container" v-loading="loginLoading">
    <div class="row">
      <app-movie-list
        v-for="resource in userMovieList"
        :key="resource.id"
        :resource="resource"
      />
    </div>
  </div>
</template>

<script>
import { MOVIE_LISTS, LOGIN } from "@/store/storeconstants";
import { mapGetters } from "vuex";

import MovieListVue from "../components/MovieSection/MovieList.vue";

export default {
  components: {
    appMovieList: MovieListVue
  },
  computed: {
    ...mapGetters(MOVIE_LISTS, ["userMovieList"]),
    ...mapGetters(LOGIN, ["loginLoading", "loginToken", "loginUserData"])
  },
  mounted() {
    if (this.loginToken && this.loginUserData) {
      this.$store.dispatch(`${MOVIE_LISTS}/getUserMovieLists`, {
        token: this.loginToken,
        userId: this.loginUserData.id
      });
    } else {
      // this.$store.dispatch(`${LOGIN}/toggleActive`, true);
      // this.$router.push("/");
    }
  }
};
</script>

<style></style>
