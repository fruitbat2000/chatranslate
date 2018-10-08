import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		authUi: null
	},
	mutations: {
		setAuthUi(state, payload) {
			state.authUi = payload.authInstance;
		}
	},
	actions: {

	}
})
