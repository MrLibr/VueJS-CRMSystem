import firebase from 'firebase/app';

export default {
  actions: {
    async fetchCategories({ dispatch, commit }) {
      try {
        const currentId = await dispatch('getId');
        const categories = (await firebase.database().ref(`users/${currentId}/categories`).once('value')).val() || {};
        return Object.keys(categories).map((key) => ({ ...categories[key], id: key }));
      } catch (error) {
        commit('setError', error);
        throw error;
      }
    },
    async categoryCreate({ dispatch, commit }, { title, limit }) {
      try {
        const currentId = await dispatch('getId');
        const category = await firebase.database().ref(`users/${currentId}/categories`).push({ title, limit });
        return { id: category.key, title, limit };
      } catch (error) {
        commit('setError', error);
        throw error;
      }
    },
    async updateCategory({ dispatch, commit }, { id, title, limit }) {
      try {
        const currentId = await dispatch('getId');
        await firebase.database().ref(`users/${currentId}/categories`).child(id).update({ title, limit });
      } catch (error) {
        commit('setError', error);
        throw error;
      }
    },
  },
};
