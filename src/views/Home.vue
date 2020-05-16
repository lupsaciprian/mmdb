<template>
  <div>
    <app-movie-list
      v-for="resource in resources"
      :key="resource.id"
      :resource="resource"
    />

    <div
      class="m-5"
      v-if="passiveResources.length > 0"
    >
      <h2>Want more? See other categories</h2>
      <app-button-toolbar
        @optionSelected="insertNewMovieSection"
        :options="passiveResources"
        buttonSize="lg"
      />
    </div>
  </div>
</template>

<script>
import MovieListVue from "../components/MovieSection/MovieList.vue";
import ButtonToolbarVue from "../components/ButtonToolbar.vue";

const initialMovieLists = [
  { id: "trending", name: "Trending Movies" },
  { id: "bygenre", name: "Movies by genre" }
];

export default {
  name: "Home",
  components: {
    appMovieList: MovieListVue,
    appButtonToolbar: ButtonToolbarVue
  },
  data() {
    return {
      resources: initialMovieLists,
      passiveResources: [
        { id: "popular", name: "Popular Movies" },
        { id: "toprated", name: "Top Rated Movies" },
        { id: "upcoming", name: "Upcoming Movies" }
      ]
    };
  },
  methods: {
    insertNewMovieSection($e) {
      const recieved = this.passiveResources.find((resource, k) => {
        if (resource.id === $e.id) {
          this.passiveResources.splice(k, 1);
          return resource;
        } else return false;
      });

      this.resources.push(recieved);
    }
  },
  mounted() {
    console.log(this.$store.getters["home/getFromMovieList"]("trending"));
  }
};
</script>
