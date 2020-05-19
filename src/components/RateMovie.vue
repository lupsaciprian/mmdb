<template>
  <div>
    <h4>Rate this movie</h4>
    <div class="row p-2 d-flex justify-content-between">
      <app-slider
        class="w-75"
        v-model="rating"
        :min="minRate"
        :max="maxRate"
        :tooltip-formatter="formatTooltip"
        marks
      ></app-slider>
      <span class="font-weight-bold">{{ rating }} / {{ maxRate }}</span>
    </div>
    <div class="row d-flex justify-content-end mt-2">
      <button class="btn btn-outline-primary">Rate me!</button>
    </div>
  </div>
</template>

<script>
import VueSlider from "vue-slider-component";
import "vue-slider-component/theme/default.css";

export default {
  components: {
    appSlider: VueSlider
  },
  data() {
    return {
      rating: 1,
      minRate: 1,
      maxRate: 10
    };
  },
  methods: {
    formatTooltip() {
      if (this.rating <= 3) return "Awful movie";
      else if (this.rating <= 6) return "The movie is alright";
      else if (this.rating <= 8) return "That was a good movie!";
      return "That was a great movie!";
    }
  }
};
</script>

<style></style>
