import '@babel/polyfill';
import Vue from 'vue';
// import './utils/service-worker';
import '../scss/index.scss';

import VueMaterial from 'vue-material';
import 'vue-material/dist/vue-material.min.css';
import 'vue-material/dist/theme/default-dark.css';

Vue.use(VueMaterial);

Vue.config.debug = true;

(async () => {
  const App = (await import('./App.vue')).default;

  new Vue({
    el: '#app',
    render: h => h(App),
  });
})();
