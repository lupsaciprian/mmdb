<template>
  <nav class="navbar navbar-light bg-white fixed-top" style="max-height: 70px;">
    <ul v-if="!isMobile" class="nav nav-pills">
      <li class="nav-item">
        <router-link class="nav-link" :to="{ name: 'Home', exact: true }">
          Dashboard
        </router-link>
      </li>
      <li class="nav-item">
        <router-link
          class="nav-link"
          v-if="loginIsLoggedIn"
          :to="{ name: 'Account', exact: true }"
          exact
        >
          My Account
        </router-link>
      </li>
    </ul>

    <app-search />

    <div v-if="!isMobile">
      <app-spinner-button
        v-if="!loginIsLoggedIn"
        @click.native="setActiveDropdown"
        :isLoading="loginLoading"
        classes="btn btn-primary"
        >Login</app-spinner-button
      >

      <div v-if="loginIsLoggedIn && loginUserData" class="d-flex">
        <router-link
          class="nav-link mr-1"
          v-if="loginIsLoggedIn"
          :to="{ name: 'Account', exact: true }"
          exact
        >
          {{ loginUserData.username }}
        </router-link>

        <button @click="logout" class="btn btn-danger">Logout</button>
      </div>
    </div>

    <div v-else>
      <button
        class="navbar-toggler p-0"
        type="button"
        @click="toggleMobileDropdown"
        style="border: 0;"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
    </div>
  </nav>
</template>

<script>
import { LOGIN } from '@/store/storeconstants';
import { mapGetters } from 'vuex';

import SearchBoxVue from '@/components/Search/SearchBox.vue';

export default {
  components: {
    appSearch: SearchBoxVue,
  },
  computed: {
    ...mapGetters(['isMobile', 'activeDropdown']),
    ...mapGetters(LOGIN, ['loginLoading', 'loginIsLoggedIn', 'loginUserData']),
  },
  methods: {
    setActiveDropdown() {
      this.$store.dispatch('setActiveDropdown', 'login');
    },
    logout() {
      this.$store.dispatch(`${LOGIN}/logout`);
    },
    toggleMobileDropdown() {
      this.$store.dispatch(
        'setActiveDropdown',
        !this.activeDropdown ? 'mobile_dropdown' : null
      );
    },
  },
};
</script>

<style></style>
