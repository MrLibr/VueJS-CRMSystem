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
  },
};
