import firebase from 'firebase/app';

export default {
  actions: {
    async categoryCreate({ dispatch, commit }, { title, limit }) {
      try {
        const currentId = await dispatch('getId');
        const category = await firebase.database().ref(`users/${currentId}/categories`).push({ title, limit });
        console.log(category);
        return { id: category.key, title, limit };
      } catch (error) {
        commit('setError', error);
        throw error;
      }
    },
  },
};
