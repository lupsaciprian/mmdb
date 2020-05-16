import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import VueLazyload from 'vue-lazyload';

// Style
import './style.scss';

import loading from '@/directives/loading';
import scroll from '@/directives/scroll';

import appSpinnerButton from '@/components/base/SpinnerButton.vue';

// Global Directives
Vue.directive('loading', loading);
Vue.directive('scroll', scroll);

// Global Components
Vue.component('appSpinnerButton', appSpinnerButton);

Vue.config.productionTip = false;

Vue.use(VueLazyload, {
  preLoad: 1.3,
  error:
    'https://pbs.twimg.com/profile_images/1243623122089041920/gVZIvphd.jpg',
  loading:
    'https://pbs.twimg.com/profile_images/1243623122089041920/gVZIvphd.jpg',
  attempt: 1,
  listenEvents: ['scroll'],
  observer: true,
  observerOptions: {
    rootMargin: '0px',
    threshold: 0.1,
  },
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
