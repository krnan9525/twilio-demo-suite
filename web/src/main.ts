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
  MdSnackbar,
  MdTable,
  MdIcon,
  MdDialog,
  MdCheckbox
  // @ts-ignore
} from 'vue-material/dist/components';
import 'vue-material/dist/vue-material.min.css';
import './common/materialTheme.scss';
import VueGtag from 'vue-gtag';

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
Vue.use(MdTable);
Vue.use(MdIcon);
Vue.use(MdDialog);
Vue.use(MdCheckbox);

// GA configurations
Vue.use(VueGtag, {
  config: { id: 'UA-78619837-4' }
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');

export const EventBus = new Vue();
