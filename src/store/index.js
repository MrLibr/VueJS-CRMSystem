import Vue from 'vue';
import Vuex from 'vuex';

import auth from './auth';
import info from './info';
import category from './category';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    error: null,
  },
  mutations: {
    setError(state, error) {
      state.error = error;
    },
    clearError(state) {
      state.error = null;
    },
  },
  getters: {
    errors: (state) => state.error,
  },
  actions: {
    async fetchCurrency() {
      const keyFromFixer = process.env.VUE_APP_FIXER;
      const urlFromCurrency = `http://data.fixer.io/api/latest?access_key=${keyFromFixer}&symbols=USD,EUR,BLR,RUB`;
      const result = await fetch(urlFromCurrency);
      return result.json();
    },
  },
  modules: {
    auth,
    info,
    category,
  },
});
