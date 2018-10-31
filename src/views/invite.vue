<template>
	<div class="invite">
		<h2>invite your friends to chat</h2>
		<form>
			<input type="email" name="email" id="email" placeholder="Enter email address" v-model="email">
			<button @click.prevent="createInvite">Submit</button>
		</form>
	</div>
</template>

<script>

export default {
	name: 'invite',
	components: {
	},
	data() {
		return {
			db: this.$store.state.db,
			email: null,
			emailRegex: /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/,
			validated: false
		}
	},
	mounted() {
		console.log('invite mounted', this.db);
	},
	methods: {
		createInvite() {
			console.log('check if user already exists, send appropriate invite email');
			this.validated = true;
			if (this.emailValid) {
				let invite = {
					from: this.$store.state.user.uid,
					timestamp: Date.now(),
					to: this.email
				}
				console.log(invite);
			}
		}
	},
	computed: {
		emailValid() {
			return this.emailRegex.test(this.email);
		}
	}
}
</script>
