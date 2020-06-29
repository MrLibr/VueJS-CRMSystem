import firebase from 'firebase/app';

export default {
  actions: {
    async login({ commit }, { email, password }) {
      try {
        await firebase.auth().signInWithEmailAndPassword(email, password);
      } catch (error) {
        commit('setError', error);
        throw error;
      }
    },
    async register({ dispatch, commit }, { email, password, name }) {
      try {
        await firebase.auth().createUserWithEmailAndPassword(email, password);
        const userId = await dispatch('getId');
        await firebase.database().ref(`/users/${userId}/info`).set({
          bill: 9000,
          name,
        });
      } catch (error) {
        commit('setError', error);
        throw error;
      }
    },
    getId() {
      const { currentUser } = firebase.auth();
      return currentUser ? currentUser.uid : null;
    },
    async logout({ commit }) {
      await firebase.auth().signOut();
      commit('clearInfo');
    },
  },
};
