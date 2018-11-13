<template>
	<div id="firebaseui-auth-container"></div>
</template>

<script>
	import firebase from "firebase/app";

	export default {
		name: 'auth',
		components: {
			
		},
		data() {
			return {
				config: {
					signInSuccessUrl: localStorage.getItem('redirectUrl'),
					signInOptions: [
						firebase.auth.GoogleAuthProvider.PROVIDER_ID,
						firebase.auth.EmailAuthProvider.PROVIDER_ID
					],
					tosUrl: '/about',
					privacyPolicyUrl: function() {
						window.location.assign('/about');
					}
				},
				ui: this.$store.state.authUi
			}
		},
		mounted() {
			this.ui.start('#firebaseui-auth-container', this.config);
		},
		methods: {
			
		},
		watch: {
			
		}
	}
</script>