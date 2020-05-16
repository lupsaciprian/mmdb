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
      v-if="movieLists && movieLists.length > 0"
    >
      <app-movie-list
        v-for="movieList in movieLists"
        :key="movieList.id"
        :resource="movieList"
        :meta="{ byId: $route.params.id }"
      />
    </div>
  </div>
</template>

<script>
import axios from "@/api";
import { imageSrc } from "@/constants";
import MovieListVue from "../components/MovieSection/MovieList.vue";
import RevealVue from "../components/Reveal.vue";
import DetailReviewVue from "../components/DetailReview.vue";

const initialMovieLists = [
  { id: "similar", name: "Similar movies to this movie" },
  { id: "recommended", name: "Recommended movies for this movie " }
];

export default {
  components: {
    appMovieList: MovieListVue,
    appReveal: RevealVue,
    appDetailReview: DetailReviewVue
  },
  data() {
    return {
      movie: null,
      loading: false,
      imageSrc,
      movieLists: null,
      reviews: null,
      reviewsLoading: false
    };
  },
  watch: {
    $route(to, from) {
      if (to !== from) this.initialLoad();
    }
  },
  methods: {
    getMovieDetails() {
      const { id } = this.$route.params;
      this.loading = true;
      return axios
        .get(`/movie/${id}`)
        .then(({ data }) => {
          this.loading = false;

          if (data.release_date) {
            data.release_date = new Date(data.release_date).getFullYear();
          }
          if (data.runtime) {
            if (data.runtime / 60 > 1)
              data.runtime = `${Math.floor(data.runtime / 60)}h ${data.runtime %
                60}min`;
            else data.runtime = `${data.runtime}min`;
          }

          if (data.spoken_languages)
            data.spoken_languages = data.spoken_languages
              .map(language => language.name)
              .join(", ");

          if (data.production_companies)
            data.production_companies = data.production_companies.slice(0, 4);

          this.movie = data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    getReviews() {
      const { id } = this.$route.params;
      this.reviewsLoading = true;
      console.log(this.reviewsLoading);
      setTimeout(() => {
        axios
          .get(`/movie/${id}/reviews`)
          .then(response => {
            this.reviewsLoading = false;
            this.reviews = response.data.results;
            console.log(response);
          })
          .catch(err => {
            this.reviewsLoading = false;
            console.log(err);
          });
      }, 3000);
    },
    async initialLoad() {
      await this.getMovieDetails();
      this.movieLists = initialMovieLists;
      if (this.reviews) this.getReviews();
    }
  },
  mounted() {
    this.initialLoad();
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
