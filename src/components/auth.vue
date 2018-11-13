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
					signInSuccessUrl: this.$store.state.redirectUrl,
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
			console.log('auth mounted');
			console.log(this.$store.state.redirectUrl);
			this.ui.start('#firebaseui-auth-container', this.config);
		},
		methods: {
			
		},
		watch: {
			
		}
	}
</script>