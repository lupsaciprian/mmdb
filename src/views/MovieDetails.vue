<template>
  <div
    class="container movie-details-main h-100 my-5"
    v-loading="loading"
  >
    <div
      v-if="movie"
      class="row"
    >
      <div class="col-12 col-md-4 position-relative">
        <div class="card position-sticky">
          <div class="card-body text-left">
            <h1>{{ movie.title }} ({{ movie.release_date }})</h1>
            <img
              v-lazy="imageSrc + movie.poster_path"
              class="card-img"
              alt=""
            />
          </div>
        </div>
      </div>

      <div class="col-12 col-md-8 description-panel">
        <div class="card">
          <div class="card-body text-left card-info">
            <h3>About this movie</h3>
            <div class="description-box  border-left bw-4 border-success pl-4">
              <p>{{ movie.overview }}</p>

              <span class="badge badge-primary mr-1">{{ movie.runtime }}</span>
              <span
                v-for="genre in movie.genres"
                :key="genre.id"
                class="badge badge-secondary mr-1"
              >{{ genre.name }}</span>

              <p class="mt-2">
                Available languages: {{ movie.spoken_languages }}
              </p>
            </div>
          </div>
        </div>

        <div
          v-if="movie.production_companies.length > 0"
          class="card  "
        >
          <div class="card-body text-left card-info">
            <div class="description-box">
              <h3>Produced by:</h3>
              <div class="row mt-2">
                <div
                  v-for="company in movie.production_companies"
                  :key="company.id"
                  class="col-6 col-sm-6 col-md-3 d-flex align-items-center mb-4"
                >
                  <img
                    v-lazy="imageSrc + company.logo_path"
                    class="card-img"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <app-reveal
          @revealFired="getReviews"
          :contentId="'reviews'"
          v-loading="reviewsLoading"
        >
          <template>Show reviews</template>
          <div
            v-if="reviews"
            slot="content"
            class="card"
          >
            <h3 class="my-2 p-4 text-left card-title">Reviews</h3>
            <div class="card-body">
              <app-detail-review
                v-for="review in reviews"
                :key="review.id"
                :review="review"
              />
            </div>
          </div>
        </app-reveal>
      </div>
    </div>
    <div
      class="row"
      v-if="allMovieDetailsLists"
    >
      {}
      <app-movie-list
        v-for="movieList in allMovieDetailsLists"
        :key="movieList.id"
        :resource="movieList"
      />
    </div>
  </div>
</template>

<script>
import { imageSrc } from "@/constants";
import MovieListVue from "../components/MovieSection/MovieList.vue";
import RevealVue from "../components/Reveal.vue";
import DetailReviewVue from "../components/DetailReview.vue";

import { MOVIE_LISTS, MOVIE_DETAILS } from "@/store/storeconstants";
import { mapGetters } from "vuex";

export default {
  components: {
    appMovieList: MovieListVue,
    appReveal: RevealVue,
    appDetailReview: DetailReviewVue
  },
  data() {
    return {
      imageSrc
    };
  },
  computed: {
    ...mapGetters(MOVIE_LISTS, ["allMovieDetailsLists"]),
    ...mapGetters(MOVIE_DETAILS, [
      "movieId",
      "movie",
      "loading",
      "reviews",
      "reviewsLoading"
    ]),
    id() {
      return this.$route.params.id;
    }
  },
  watch: {
    $route(to, from) {
      if (to !== from) {
        console.log("TO FROM");
        this.initializeId();
        this.getMovieDetails();
      }
    }
  },
  methods: {
    getMovieDetails() {
      this.$store.dispatch(`${MOVIE_DETAILS}/getMovieDetails`);
    },
    getReviews() {
      this.$store.dispatch(`${MOVIE_DETAILS}/getMovieDetailsReviews`);
    },
    initializeId() {
      this.$store.dispatch(`${MOVIE_LISTS}/setMovieDetailsId`, this.id);
      this.$store.dispatch(`${MOVIE_DETAILS}/setMovieDetailId`, this.id);
    }
  },
  created() {
    this.initializeId();
  },
  mounted() {
    this.getMovieDetails();
  }
};
</script>

<style lang="scss" scoped>
.movie-details-main {
  min-height: 700px;
}
.description-panel .card {
  margin-bottom: 12px;
}
</style>
