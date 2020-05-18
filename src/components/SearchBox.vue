<template>
  <form
    @submit.prevent="search"
    class="form-inline"
  >
    <input
      v-model="searchInput"
      class="form-control mr-sm-2"
      type="search"
      placeholder="Search"
      aria-label="Search"
      style="width: 30vw"
    />
    <button
      :disabled="searchInput === ''"
      class="btn btn-outline-success my-2 my-sm-0 mr-sm-2"
      type="submit"
    >
      Search
    </button>
  </form>
</template>

<script>
import { SEARCH, LOGIN } from "@/store/storeconstants";

export default {
  data() {
    return {
      searchInput: ""
    };
  },
  methods: {
    search() {
      this.$store.dispatch(`${LOGIN}/toggleActive`, false);
      this.$store.dispatch(`${SEARCH}/toggleActive`, true);
      this.$store.dispatch(`${SEARCH}/setSearchKeyword`, this.searchInput);

      this.$store.dispatch(`${SEARCH}/getSearchMovieList`);
    }
  }
};
</script>

<style></style>
