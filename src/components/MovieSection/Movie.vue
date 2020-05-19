<template>
  <div
    class="col-12 col-sm-6 col-md-4 col-lg-3 animate__animated animate__zoomInRight animate__fast"
  >
    <router-link
      :to="{ name: 'Movie Details', params: { id: movie.id } }"
      exact
    >
      <div class="card text-white">
        <img v-lazy="imgSrc" v-once class="card-img" :alt="movie.title" />
        <div>
          <h5 v-once class="card-title text-dark p-2 m-0">
            {{ movie.title }}
            <span v-if="movie.rating" v-once class="badge badge-success"
              >Your rating: {{ movie.rating }}</span
            >
            <span
              v-else-if="movie.vote_average > 0"
              v-once
              class="badge badge-primary"
              >{{ movie.vote_average }}</span
            >
          </h5>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
import { imageSrc } from '@/config/constants';

export default {
  props: {
    movie: {
      type: Object,
      required: true,
    },
  },
  computed: {
    imgSrc() {
      return imageSrc + this.movie.poster_path;
    },
  },
};
</script>

<style scoped lang="scss">
.card {
  cursor: pointer;
}
</style>
