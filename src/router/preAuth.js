import store from "@/store/";
import { LOGIN } from "@/store/storeconstants";

const requireAuth = async (to, from, next) => {
  const token = localStorage.getItem("token");

  if (to.meta.requireLogin) {
    const isLoggedIn = store.getters[`${LOGIN}/loginIsLoggedIn`];
    if (isLoggedIn) next();
    else {
      if (token) {
        // Block upcoming events untill getUser is finished
        await store.dispatch(`${LOGIN}/getUser`, token);
        next();
      } else next("");
      // next('') = redirect to Home component
    }
  } else {
    if (token) store.dispatch(`${LOGIN}/getUser`, token);
    next();
  }
};

export default requireAuth;
