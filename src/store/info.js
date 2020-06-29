import firebase from 'firebase/app';

export default {
  state: {
    info: {},
  },
  getters: {
    info: (state) => state.info,
  },
  mutations: {
    setInfo(state, info) {
      state.info = info;
    },
    clearInfo(state) {
      state.info = {};
    },
  },
  actions: {
    async fetchInfo({ dispatch, commit }) {
      try {
        const currentId = await dispatch('getId');
        const info = (await firebase.database().ref(`/users/${currentId}/info`).once('value')).val();
        commit('setInfo', info);
      } catch (error) {
        commit('setError', error);
        throw error;
      }
    },
    async updateInfo({ dispatch, commit, getters }, toUpdate) {
      try {
        const currentId = await dispatch('getId');
        const updateData = { ...getters.info, ...toUpdate };
        await firebase.database().ref(`/users/${currentId}/info`).update(updateData);
        commit('setInfo', updateData);
      } catch (error) {
        commit('setError', error);
        throw error;
      }
    },
  },
};
