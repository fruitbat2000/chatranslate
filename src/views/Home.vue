<template>
	<div class="home">
		<p v-if="user">Hello {{user.displayName}}!</p>
		<p v-if="!user">Hello there! You need to <router-link to="/sign-in">sign-in</router-link> to continue</p>
	</div>
</template>

<script>
import store from '@/store';

export default {
	name: 'home',
	components: {

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
