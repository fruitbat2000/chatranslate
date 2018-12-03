import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		authUi: null,
		authInitiated: false,
		user: null,
		db: null,
		redirectUrl: null,
		contacts: null,
		chats: null
	},
	mutations: {
		setAuthUi(state, payload) {
			state.authUi = payload.authInstance;
		},
		setUser(state, payload) {
			state.authInitiated = true;
			state.user = payload;
		},
		updateUser(state, payload) {
			state.user[payload.property] = payload.value;
		},
		setContacts(state, payload) {
			state.contacts = payload;
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
		getUser({commit, dispatch, state}, payload) {
			let userDoc = state.db.collection('users').doc(payload.user.uid);
			let [lang, locale] = (((navigator.userLanguage || navigator.language).replace('-', '_')).toLowerCase()).split('_');

			userDoc.get().then(function(doc) {
				if (doc.exists) {

					commit('setUser', doc.data());
					dispatch('getContacts', payload.user.uid);

				} else {

					let user = {
						contacts: [], 
						chats: [],
						pendingInvites: [],
						avatar: null,
						primaryLanguage: lang,
						locale: locale,
						displayName: payload.user.displayName,
						email: payload.user.email,
						verified: payload.user.emailVerified,
						phoneNumber: payload.user.phoneNumber,
						providerData: payload.user.providerData,
						uid: payload.user.uid,
						joined: Date.now()
					}

					userDoc.set(user).then(function() {
						// might be better to grab the data back from the db?
						commit('setUser', user);
					})
					.catch(function(error) {
						console.error("Error writing document: ", error);
					});
					
				}
			}).catch(function(error) {
				console.log("Error getting document:", error);
			});
		},
		getContacts({commit, state}, payload) {
			state.db.collection('users').doc(payload)
				.onSnapshot(doc => {
					let tmp = [],
							total = doc.data().contacts.length,
							length = 0;

					doc.data().contacts.forEach(contact => {
						state.db.collection('users').doc(contact)
							.get()
							.then(doc => {
								length ++
								tmp.push(doc.data())

								if (length === total) {
									console.log('all finished', tmp);
									commit('setContacts', tmp);
								}
							})
							.catch(err => {
								console.log(err);
							})
					});
				})
		}
	}
})
