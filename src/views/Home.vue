<template>
	<div class="home">
		<dashboard v-if="user"></dashboard>
		<p v-if="!user">Hello there! You need to <router-link to="/sign-in">sign-in</router-link> to continue</p>
	</div>
</template>

<script>
import store from '@/store';
import dashboard from '@/components/dashboard'

export default {
	name: 'home',
	components: {
		dashboard
	},
	data() {
		return {
			sharedState: store.state
		}
	},
	mounted() {
		console.log('home mounted', this.sharedState);
	},
	computed: {
		user() {
			return this.sharedState.user
		}
	}
}
</script>
