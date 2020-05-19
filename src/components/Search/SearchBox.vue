<template>
  <form @submit.prevent="search" class="form-inline">
    <input
      v-model="searchInput"
      id="searchInput"
      class="form-control mr-sm-2"
      type="search"
      placeholder="Search"
      aria-label="Search"
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
import { SEARCH } from '@/store/storeconstants';

export default {
  data() {
    return {
      searchInput: '',
    };
  },
  methods: {
    search() {
      const { dispatch } = this.$store;
      dispatch('setActiveDropdown', 'search');
      dispatch(`${SEARCH}/setSearchKeyword`, this.searchInput);

      dispatch(`${SEARCH}/getSearchMovieList`);
    },
  },
};
</script>

<style scoped lang="scss">
#searchInput {
  width: 30vw;
}
</style>
