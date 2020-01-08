import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '#call-logs',
    name: 'call logs',
    component: () =>
      import(/* webpackChunkName: "call-logs" */ '../views/CallLogs.vue')
    // component: CallLogs
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
