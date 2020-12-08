import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'calls',
    component: () =>
      import(/* webpackChunkName: "calls" */ '../views/Calls.vue')
  },
  {
    path: '/call-logs',
    name: 'call logs',
    component: () =>
      import(/* webpackChunkName: "call-logs" */ '../views/CallLogs.vue')
  },
  {
    path: '/video',
    name: 'video',
    component: () =>
      import(/* webpackChunkName: "video" */ '../views/Video.vue')
  },
  {
    path: '/sms',
    name: 'sms',
    component: () => import(/* webpackChunkName: "sms" */ '../views/Sms.vue')
  },
  {
    path: '/sms-instance/:fromNumber',
    name: 'sms-instance',
    component: () =>
      import(/* webpackChunkName: "sms-instance" */ '../views/SmsInstance.vue')
  }
];

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
});

export default router;
