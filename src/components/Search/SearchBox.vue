<template>
  <form
    @submit.prevent="search"
    class="d-flex align-items-center"
    :class="{ 'w-50': !isMobile }"
  >
    <input
      v-model="searchInput"
      id="searchInput"
      class="flex-fill form-control mr-sm-2"
      type="search"
      placeholder="Search"
      aria-label="Search"
    />
    <button
      :disabled="searchInput === ''"
      class="flex-fill btn btn-outline-success my-2 my-sm-0 mr-sm-2"
      type="submit"
    >
      Search
    </button>
  </form>
</template>

<script>
import { SEARCH } from "@/store/storeconstants";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      searchInput: ""
    };
  },
  computed: {
    ...mapGetters(["isMobile"])
  },
  methods: {
    search() {
      const { dispatch } = this.$store;
      dispatch("setActiveDropdown", "search");
      dispatch(`${SEARCH}/setSearchKeyword`, this.searchInput);
    }
  }
};
</script>

<style scoped lang="scss"></style>
