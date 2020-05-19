<template>
  <div id="app" class="full-screen">
    <app-nav ref="navbar" />

    <div id="nav-spacer" :style="{ marginTop: navbarHeight }"></div>

    <div class="bg-primary p-4 text-white">
      <h1>My Movie Database app</h1>
    </div>

    <transition
      name="overlay-panel"
      enter-active-class="animate__animated animate__fadeInRightBig"
      leave-active-class="animate__animated animate__fadeOutRightBig"
    >
      <div
        v-if="decideOverlay()"
        :style="{ top: navbarHeight }"
        class="overlay-panel bg-white w-100 border p-2"
      >
        <component :is="decideOverlay()"></component>
      </div>
    </transition>

    <transition
      enter-active-class="animate__animated animate__fadeInLeft animate__faster"
    >
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import NavVue from "./components/Nav.vue";

import { mapGetters } from "vuex";
import { SEARCH, LOGIN } from "@/store/storeconstants";

export default {
  components: {
    appNav: NavVue,
    appSearchResults: () => import("./components/SearchResults"),
    appLogin: () => import("./components/Login")
  },
  data() {
    return { navbarHeight: "0px" };
  },
  computed: {
    ...mapGetters(SEARCH, ["searchActive"]),
    ...mapGetters(LOGIN, ["loginActive", "loginLoading"])
  },
  watch: {
    $route() {
      this.$store.dispatch(`${SEARCH}/toggleActive`, false);
    }
  },
  methods: {
    decideOverlay() {
      if (this.searchActive) return "appSearchResults";
      if (this.loginActive) return "appLogin";
    },
    getNavbarHeight() {
      this.navbarHeight = this.$refs.navbar.$el.clientHeight + "px";
      console.log(this.navbarHeight);
    }
  },
  mounted() {
    this.getNavbarHeight();
    const { path, query } = this.$route;
    if (path === "/redirected") {
      this.$store.dispatch(`${LOGIN}/hasBeenRedirected`, {
        approved: query.approved,
        request_token: query.request_token
      });
      this.$router.push({ path: "/" });
    }
  }
};
</script>

<style lang="scss" scoped>
.overlay-panel {
  position: fixed;
  z-index: 100;
  min-height: 300px;
}
</style>
