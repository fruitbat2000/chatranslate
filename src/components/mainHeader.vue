<template>
	<header class="main-header">
		<router-link to="/">
			<h1 class="logotype">fluentsy</h1>
		</router-link>
		<router-link to="/sign-in" v-if="$store.state.authInitiated && !$store.state.user">Sign in</router-link>
		<button class="btn--link" v-if="$store.state.authInitiated && $store.state.user" @click="signOut">Sign out</button>
	</header>
</template>

<script>
	import firebase from "firebase/app";

	export default {
		name: 'mainHeader',
		components: {

		},
		data() {
			return {
				
			}
		},
		mounted() {
			console.log('header mounted');
		},
		methods: {
			signOut() {
				firebase.auth().signOut();
				this.$router.push('/');
				this.$store.commit('setRedirectUrl', {path: '/'});
			}
		},
		watch: {
			
		}
	}
</script>
<style lang="scss">
	@import '../assets/sass/variables';
	@import '../assets/sass/mixins';

	.main-header {
		align-items: center;
		background-color: $primary;
		display: flex;
		justify-content: space-between;
		padding: 20px;

		a {
			text-decoration: none;
		}

		.logotype {
			@include font-size(36);
			color: $logotype;
			font-family: $montReg;
			margin: 0;
		}
	}
</style>