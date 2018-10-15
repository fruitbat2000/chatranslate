<template>
	<div id="firebaseui-auth-container"></div>
</template>

<script>
	import store from '@/store';
	import firebase from "firebase/app";
	
	const uiConfig = {
		signInSuccessUrl: '/',
		signInOptions: [
			firebase.auth.GoogleAuthProvider.PROVIDER_ID,
			firebase.auth.EmailAuthProvider.PROVIDER_ID
		],
		tosUrl: '/about',
		privacyPolicyUrl: function() {
			window.location.assign('/about');
		}
	}

	export default {
		name: 'auth',
		components: {
			
		},
		data() {
			return {
				ui: store.state.authUi
			}
		},
		mounted() {
			console.log('auth mounted');
			this.ui.start('#firebaseui-auth-container', uiConfig);
		},
		methods: {
			
		},
		watch: {
			
		}
	}
</script>