import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

import preAuth from "./preAuth";

Vue.use(VueRouter);

const routes = [
  {
    path: ":redirect?",
    name: "Home",
    component: Home
  },
  {
    path: "/details/:id",
    name: "Movie Details",
    component: () =>
      import(/* webpackChunkName: "details" */ "../views/MovieDetails.vue")
  },
  {
    path: "/account",
    name: "Account",
    component: () =>
      import(/* webpackChunkName: "account" */ "../views/Account.vue"),
    meta: { requireLogin: true }
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

router.beforeEach(preAuth);

export default router;
