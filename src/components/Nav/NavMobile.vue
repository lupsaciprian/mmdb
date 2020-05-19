<template>
  <div>
    <div v-if="loginIsLoggedIn" class="p-4 bg-dark text-white">
      <span
        >Welcome back,
        <span class="font-weight-bold text-success">{{
          loginUserData.username
        }}</span
        >!</span
      >
    </div>

    <div
      v-if="!loginIsLoggedIn"
      @click="login"
      class="list-group-item list-group-item-action nav-link cursor-pointer"
    >
      <span class="w-100">Login</span>
    </div>
    <div
      v-else
      @click="logout"
      class="list-group-item list-group-item-action nav-link cursor-pointer"
    >
      <span class="w-100">Logout</span>
    </div>

    <div class="list-group">
      <router-link
        class="nav-link list-group-item"
        :to="{ name: 'Home', exact: true }"
      >
        Dashboard
      </router-link>
      <router-link
        class="nav-link list-group-item"
        v-if="loginIsLoggedIn"
        :to="{ name: 'Account', exact: true }"
        exact
      >
        My Account
      </router-link>
    </div>
  </div>
</template>

<script>
import { LOGIN } from '@/store/storeconstants';
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters(LOGIN, ['loginLoading', 'loginIsLoggedIn', 'loginUserData']),
  },
  methods: {
    login() {
      this.$store.dispatch('setActiveDropdown', 'login');
    },
    logout() {
      this.$store.dispatch('setActiveDropdown', null);
      this.$store.dispatch(`${LOGIN}/logout`);
    },
  },
};
</script>

<style></style>
