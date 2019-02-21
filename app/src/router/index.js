import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    name: 'home',
    path: '/',
    component: require('../views/Dashboard.vue').default,
  },
  {
    name: 'details',
    path: '/details/:id',
    component: require('../views/Details.vue').default,
  },
  {
    path: '*',
    redirect: {
      path: '/',
    },
  },
];

const router = new VueRouter({
  routes,
});

export default router;
