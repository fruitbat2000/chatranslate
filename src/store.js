import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		authUi: null,
		authInitiated: false,
		user: null,
		db: null,
		redirectUrl: null
	},
	mutations: {
		setAuthUi(state, payload) {
			state.authUi = payload.authInstance;
		},
		setUser(state, payload) {
			state.authInitiated = true;
			state.user = payload;
		},
		setDbInstance(state, payload) {
			state.db = payload.db;
		},
		setRedirectUrl(state, payload) {
			console.log('setRedirect', payload);
			state.redirectUrl = payload.path
			localStorage.setItem('redirectUrl', payload.path);
		}
	},
	actions: {
		getUser({commit, state}, payload) {
			let userDoc = state.db.collection('users').doc(payload.user.uid);

			userDoc.get().then(function(doc) {
				if (doc.exists) {

					commit('setUser', doc.data());

				} else {

					let user = {
						contacts: [], 
						chats: [],
						pendingInvites: [],
						displayName: payload.user.displayName,
						email: payload.user.email,
						verified: payload.user.emailVerified,
						phoneNumber: payload.user.phoneNumber,
						providerData: payload.user.providerData,
						uid: payload.user.uid
					}

					userDoc.set(user).then(function(doc) {
						commit('setUser', doc.data());
					})
					.catch(function(error) {
						console.error("Error writing document: ", error);
					});
					
				}
			}).catch(function(error) {
				console.log("Error getting document:", error);
			});
		}
	}
})
