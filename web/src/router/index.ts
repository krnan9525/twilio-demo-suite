import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue')
  },
  {
    path: '/call-logs',
    name: 'call logs',
    component: () =>
      import(/* webpackChunkName: "call-logs" */ '../views/CallLogs.vue')
  }
];

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
});

export default router;
