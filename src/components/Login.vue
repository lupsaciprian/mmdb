<template>
  <div class="row">
    <div class="col-md-12 text-right">
      <button class="btn btn-sm btn-dark mr-2" @click="close">
        <span aria-hidden="true">&times;</span> Close
      </button>
    </div>
    <div class="col-md-6 p-4">
      <form @submit.prevent="login">
        <app-message-box class="message-box" type="danger">
          <h4 slot="heading">Disabled :(</h4>
          <p slot="details">
            The authorization api does not seem to work when accessing the user
            profile.
          </p>
        </app-message-box>

        <div class="form-group">
          <label for="username">Email address</label>
          <input
            type="text"
            v-model="username"
            class="form-control"
            disabled
            id="username"
            aria-describedby="emailHelp"
          />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input
            v-model="password"
            type="password"
            disabled
            class="form-control"
            id="password"
          />
        </div>
        <div class="form-group form-check">
          <input
            v-model="keepLoggedIn"
            type="checkbox"
            disabled
            class="form-check-input"
            id="exampleCheck1"
          />
          <label class="form-check-label" for="exampleCheck1"
            >Keep me logged in</label
          >
        </div>

        <button disabled class="btn btn-primary btn-block">
          Login
        </button>
      </form>
    </div>
    <div
      class="col-md-6 p-4 d-flex flex-column align-items-center justify-content-center"
    >
      <app-spinner-button
        @click.native="loginByRedirect"
        :isLoading="loginLoading"
        class="mb-2"
        classes="btn btn-success btn-block"
        >Login with TMDB</app-spinner-button
      >
      <button disabled class="btn btn-outline-dark  btn-block">
        Login as Guest (coming soon)
      </button>
    </div>
  </div>
</template>

<script>
import { LOGIN, SEARCH } from '@/store/storeconstants';
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      username: '',
      password: '',
      keepLoggedIn: true,
    };
  },
  computed: {
    ...mapGetters(LOGIN, ['loginLoading', 'loginError']),
  },
  methods: {
    login() {
      this.$store.dispatch(`${SEARCH}/toggleActive`, false);

      // this.$store.dispatch(`${LOGIN}/loginByEmail`, {
      //   username: this.username,
      //   password: this.password,
      //   keepLoggedIn: this.keepLoggedIn
      // });
    },
    loginByRedirect() {
      this.$store.dispatch(`${LOGIN}/loginByRedirect`);
    },
    close() {
      this.$store.dispatch(`${LOGIN}/toggleActive`, false);
    },
  },
};
</script>

<style></style>
