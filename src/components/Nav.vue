<template>
  <nav class="navbar navbar-light bg-white fixed-top">
    <ul class="nav nav-pills">
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

    <app-spinner-button
      v-if="!loginIsLoggedIn"
      @click.native="setLoginActive"
      :isLoading="loginLoading"
      classes="btn btn-primary"
      >Login</app-spinner-button
    >

    <div v-if="loginIsLoggedIn && loginUserData">
      <a class="mr-2 font-weight-bold text-primary">{{
        loginUserData.username
      }}</a>
      <button @click="logout" class="btn btn-danger">Logout</button>
    </div>
  </nav>
</template>

<script>
import { LOGIN, SEARCH } from '@/store/storeconstants';
import { mapGetters } from 'vuex';

import SearchBoxVue from './SearchBox.vue';

export default {
  components: {
    appSearch: SearchBoxVue,
  },
  computed: {
    ...mapGetters(LOGIN, ['loginLoading', 'loginIsLoggedIn', 'loginUserData']),
  },
  methods: {
    setLoginActive() {
      this.$store.dispatch(`${SEARCH}/toggleActive`, false);
      this.$store.dispatch(`${LOGIN}/toggleActive`, true);
    },
    logout() {
      this.$store.dispatch(`${LOGIN}/logout`);
    },
  },
};
</script>

<style></style>
