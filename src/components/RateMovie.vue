<template>
  <div>
    <h4>Rate this movie</h4>
    <div class="p-2 d-flex justify-content-between w-100">
      <app-slider
        class="w-75"
        v-model="rating"
        :min="minRate"
        :max="maxRate"
        :tooltip-formatter="formatTooltip"
        marks
      ></app-slider>
      <span class="font-weight-bold text-muted"
        >{{ rating }} / {{ maxRate }}</span
      >
    </div>
    <div class="d-flex justify-content-between align-items-center mt-2 w-100">
      <span v-if="movie" class="font-weight-bold h5">
        Rated at:
        <span class="badge badge-primary">{{ movie.vote_average }}</span>
      </span>
      <app-spinner-button
        @click.native="rateMovie"
        :isLoading="loginUserActionsLoading"
        :disabled="loginRateAction.disabled"
        class="mb-2"
        classes="btn btn-outline-primary"
        >{{ loginRateAction.name }}</app-spinner-button
      >
    </div>
  </div>
</template>

<script>
import VueSlider from 'vue-slider-component';
import 'vue-slider-component/theme/default.css';

import { mapGetters } from 'vuex';
import { LOGIN, MOVIE_DETAILS } from '@/store/storeconstants';

// This component is on purpose completely independent of props
export default {
  components: {
    appSlider: VueSlider,
  },
  data() {
    return {
      rating: 1,
      minRate: 1,
      maxRate: 10,
    };
  },
  computed: {
    ...mapGetters(LOGIN, [
      'loginUserActionsLoading',
      'loginRateAction',
      'loginUserData',
    ]),
    ...mapGetters(MOVIE_DETAILS, ['movie']),
  },
  methods: {
    formatTooltip() {
      if (this.rating <= 3) return 'Awful movie';
      else if (this.rating <= 6) return 'The movie is alright';
      else if (this.rating <= 8) return 'That was a good movie!';
      return 'That was a great movie!';
    },
    rateMovie() {
      this.$store.dispatch(`${LOGIN}/loggedInUserAction`, {
        action: this.loginRateAction,
        userId: this.loginUserData.id,
        movieId: this.movie.id,
        value: this.rating,
      });
    },
  },
};
</script>

<style></style>
