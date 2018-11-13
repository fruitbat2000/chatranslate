<template>
	<div class="accept-invite">
		<h2>[name] wants to chat!</h2>
		<p v-if="$route.params.id">{{$route.params.id}} {{$route.name}}</p>
		
	</div>
</template>

<script>

export default {
	name: 'acceptInvite',
	components: {
	},
	data() {
		return {
			db: this.$store.state.db,
			inviteId: this.$route.params.id
		}
	},
	mounted() {
		console.log('acceptInvite mounted');
	},
	methods: {
		checkInvite() {
			console.log('checkInvite');
		}
	},
	computed: {
		emailValid() {
			return this.emailRegex.test(this.email);
		}
	}
}
</script>
