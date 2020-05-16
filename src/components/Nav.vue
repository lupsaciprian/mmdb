<template>
  <nav class="navbar navbar-light bg-white sticky-top">
    <router-link to="/"><h1>My Movie Database</h1></router-link>
    <form @submit.prevent="search" class="form-inline">
      <input
        v-model="searchInput"
        class="form-control mr-sm-2"
        type="search"
        placeholder="Search"
        aria-label="Search"
      />
      <button
        class="btn btn-outline-success my-2 my-sm-0 mr-sm-2"
        type="submit"
      >
        Search
      </button>

      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarToggleExternalContent"
        aria-controls="navbarToggleExternalContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
    </form>

    <div class="collapse" id="navbarToggleExternalContent">
      <div class="bg-dark p-4">
        <h5 class="text-white h4">Collapsed content</h5>
        <span class="text-muted">Toggleable via the navbar brand.</span>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      searchInput: '',
    };
  },
  methods: {
    search($e) {
      console.log($e, this.searchInput);
    },
  },
};
</script>

<style></style>
