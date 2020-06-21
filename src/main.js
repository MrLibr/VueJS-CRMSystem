import Vue from 'vue';
import Vuelidate from 'vuelidate';

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

import App from './App.vue';
import router from './router';
import store from './store';

import messagePlugin from './utils/materialize.message.plugin';
import dateFilter from './filters/date.filter';

import './registerServiceWorker';
import 'materialize-css/dist/js/materialize.min';

Vue.config.productionTip = false;

Vue.use(Vuelidate);
Vue.use(messagePlugin);
Vue.filter('dateFilter', dateFilter);

firebase.initializeApp({
  apiKey: 'AIzaSyDIkGBvr8vhvZ3kSfuQ6Xzt7w1e58YvIps',
  authDomain: 'project-crm-system.firebaseapp.com',
  databaseURL: 'https://project-crm-system.firebaseio.com',
  projectId: 'project-crm-system',
  storageBucket: 'project-crm-system.appspot.com',
  messagingSenderId: '1022166561830',
  appId: '1:1022166561830:web:d31120f8f97e99e4aee2e7',
  measurementId: 'G-141P3RRDCD',
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
