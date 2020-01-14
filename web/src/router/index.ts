import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
// import CallLogs from '../views/CallLogs.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/call-logs',
    name: 'call logs',
    component: () =>
      import(/* webpackChunkName: "call-logs" */ '../views/CallLogs.vue')
    // component: CallLogs
  }
];

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
});

export default router;
