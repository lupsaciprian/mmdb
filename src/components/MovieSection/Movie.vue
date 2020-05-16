<template>
  <div class="col-12 col-sm-6 col-md-4 col-lg-3">
    <router-link
      :to="{ name: 'Movie Details', params: { id: movie.id } }"
      exact
    >
      <div class="card text-white">
        <img v-lazy="imgSrc" v-once class="card-img" alt="" />
        <div @hover="hovered">
          <h5 v-once class="card-title text-dark p-2 m-0">
            {{ movie.title }}
            <span
              v-if="movie.vote_average > 0"
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
import { imageSrc } from '@/constants';

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
  methods: {
    hovered() {
      console.log('hovered');
    },
  },
};
</script>

<style scoped lang="scss">
.card {
  cursor: pointer;
}
</style>
