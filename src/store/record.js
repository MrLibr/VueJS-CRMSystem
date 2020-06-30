import firebase from 'firebase/app';

export default {
  actions: {
    async createRecord({ dispatch, commit }, record) {
      try {
        const currentId = await dispatch('getId');
        return await firebase.database().ref(`/users/${currentId}/records`).push(record);
      } catch (error) {
        commit('setError', error);
        throw error;
      }
    },
    async fetchRecord({ dispatch, commit }) {
      try {
        const currentId = await dispatch('getId');
        const records = (await firebase.database().ref(`users/${currentId}/records`).once('value')).val() || {};
        return Object.keys(records).map((key) => ({ ...records[key], id: key }));
      } catch (error) {
        commit('setError', error);
        throw error;
      }
    },
  },
};
