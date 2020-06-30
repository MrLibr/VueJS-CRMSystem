import Vue from 'vue';
import Vuelidate from 'vuelidate';

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

import App from './App.vue';
import router from './router';
import store from './store';

import Loader from './components/app/Loader.vue';

import messagePlugin from './utils/materialize.message.plugin';
import dateFilter from './filters/date.filter';
import currencyFilter from './filters/currency.filter';
import tooltipDirective from './directives/tooltip.directive';

import './registerServiceWorker';
import 'materialize-css/dist/js/materialize.min';

Vue.config.productionTip = false;

Vue.use(Vuelidate);
Vue.use(messagePlugin);
Vue.component('Loader', Loader);
Vue.filter('dateFilter', dateFilter);
Vue.filter('currencyFilter', currencyFilter);
Vue.directive('tooltipDirective', tooltipDirective);

firebase.initializeApp({
  apiKey: 'AIzaSyDuOD2G2l-JKQd7YXlGIG0ipAc1vdzIkig',
  authDomain: 'crm-system-on-vue.firebaseapp.com',
  databaseURL: 'https://crm-system-on-vue.firebaseio.com',
  projectId: 'crm-system-on-vue',
  storageBucket: 'crm-system-on-vue.appspot.com',
  messagingSenderId: '1017182407649',
  appId: '1:1017182407649:web:2bd9f42ab45c35267da0a0',
  measurementId: 'G-74PW250RHR',
});

let app;

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: (h) => h(App),
    }).$mount('#app');
  }
});
