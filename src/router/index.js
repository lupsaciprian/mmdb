import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const MovieDetails = () =>
  import(/* webpackChunkName: "details" */ "../views/MovieDetails.vue");
const Account = () =>
  import(/* webpackChunkName: "account" */ "../views/Account.vue");

const routes = [
  {
    path: ":redirect?",
    name: "Home",
    component: Home
  },
  {
    path: "/details/:id",
    name: "Movie Details",
    component: MovieDetails
  },
  {
    path: "/account",
    name: "Account",
    component: Account
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
  scrollBehavior() {
    return { x: 0, y: 0 };
  }
});

export default router;
