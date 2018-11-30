<template>
	<div class="invite">
		<section>
			<h2>Invite your friends to chat</h2>
			<p v-if="$route.params.id">{{$route.params.id}} {{$route.name}}</p>
			<form>
				<input type="email" name="email" id="email" placeholder="Enter email address" v-model="email">
				<span v-if="validated && !emailValid">Please enter a valid email address</span>
				<button @click.prevent="createInvite">Submit</button>
			</form>
		</section>
		<section>
			<h2>Pending invitations</h2>
			<p>next up: pending invites, clearing invite queue after acceptance etc</p>
		</section>
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
					fromUid: this.$store.state.user.uid,
					fromName: this.$store.state.user.displayName,
					fromEmail: this.$store.state.user.email,
					timestamp: Date.now(),
					to: this.email
				}

				this.db.collection('invites').add(invite)
					.then((docRef) => {
						console.log('yay!', docRef)
					})
					.catch((err) => {
						console.log(err);
					});


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
