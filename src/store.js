import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		authUi: null,
		authInitiated: false,
		user: null,
		db: null
	},
	mutations: {
		setAuthUi(state, payload) {
			state.authUi = payload.authInstance;
		},
		setUser(state, payload) {
			state.authInitiated = true;
			state.user = payload.user;
		},
		setDbInstance(state, payload) {
			state.db = payload.db;
			console.log(state.db);
		}
	},
	actions: {

	}
})
