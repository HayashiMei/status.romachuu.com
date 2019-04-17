import Vue from 'vue';
import '../scss/index.scss';

import VueScroll from 'vuescroll/dist/vuescroll-native';
import 'vuescroll/dist/vuescroll.css';

import router from './router';
import store from './store';

Vue.use(VueScroll);
Vue.prototype.$vuescrollConfig = {
  scrollPanel: {
    scrollingX: false,
  },
  bar: {
    background: '#dadfe6',
    opacity: 0.4,
    hoverStyle: {
      background: '#dadfe6',
      opacity: 0.4,
    },
  },
};

Vue.config.debug = true;

(async () => {
  const App = (await import('./App.vue')).default;

  new Vue({
    el: '#app',
    render: h => h(App),
    router,
    store,
  });
})();
