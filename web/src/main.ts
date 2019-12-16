import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import './util/setupPushNotification';
import router from './router';
import store from './store';
import {
  MdButton,
  MdContent,
  MdTabs,
  MdApp,
  MdToolbar,
  MdTooltip,
  MdField,
  MdCard,
  MdMenu,
  MdList,
  MdSnackbar
  // @ts-ignore
} from 'vue-material/dist/components';
import 'vue-material/dist/vue-material.min.css';
import 'vue-material/dist/theme/default.css';

Vue.use(MdButton);
Vue.use(MdContent);
Vue.use(MdTabs);
Vue.use(MdApp);
Vue.use(MdToolbar);
Vue.use(MdTooltip);
Vue.use(MdField);
Vue.use(MdCard);
Vue.use(MdMenu);
Vue.use(MdList);
Vue.use(MdSnackbar);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
