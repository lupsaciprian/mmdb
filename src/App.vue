<template>
  <div id="app" class="full-screen">
    <app-nav ref="navbar" />

    <div id="nav-spacer" :style="{ marginTop: navbarHeight }"></div>

    <div class="bg-primary p-4 text-white">
      <h1>My Movie Database app</h1>
    </div>

    <transition
      name="overlay-panel"
      enter-active-class="animate__animated animate__fadeInRightBig animate__faster"
      leave-active-class="animate__animated animate__fadeOutRightBig animate__faster"
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
import NavVue from './components/Nav/Nav.vue';
import NavMobileVue from './components/Nav/NavMobile.vue';

import { mapGetters } from 'vuex';
import { LOGIN } from '@/store/storeconstants';

export default {
  // Lazy loaded components
  components: {
    appNav: NavVue,
    appNavMobile: NavMobileVue,
    appSearchResults: () => import('./components/Search/SearchResults'),
    appLogin: () => import('./components/Login'),
  },
  data() {
    return { navbarHeight: '0px' };
  },
  computed: {
    ...mapGetters(['activeDropdown']),
    ...mapGetters(LOGIN, ['loginLoading']),
  },
  watch: {
    $route() {
      this.$store.dispatch('setActiveDropdown', null);
    },
  },
  methods: {
    decideOverlay() {
      switch (this.activeDropdown) {
        case 'login':
          return 'appLogin';
        case 'search':
          return 'appSearchResults';
        case 'mobile_dropdown':
          return 'appNavMobile';
        default:
          return null;
      }
    },
  },
  mounted() {
    this.$store.dispatch('setMobile', window.innerWidth);

    const { path, query } = this.$route;
    if (path === '/redirected') {
      this.$store.dispatch(`${LOGIN}/hasBeenRedirected`, {
        approved: query.approved,
        request_token: query.request_token,
      });
      this.$router.push({ path: '/' });
    }

    this.$nextTick().then(() => {
      this.navbarHeight = this.$refs.navbar.$el.clientHeight + 'px';
    });
  },
};
</script>

<style lang="scss" scoped>
.overlay-panel {
  position: fixed;
  z-index: 100;
  min-height: 300px;
}
</style>
