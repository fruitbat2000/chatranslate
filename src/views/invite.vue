<template>
	<div class="invite">
		<section>
			<h2>Invite your friends to chat</h2>
			<p v-if="$route.params.id">{{$route.params.id}} {{$route.name}}</p>
			<form>
				<div class="input-grp">
					<input type="email" name="email" id="email" placeholder="Enter email address" v-model="email">
					<span v-if="validated && !emailValid" class="error">Please enter a valid email address</span>
				</div>
				<button @click.prevent="createInvite" class="btn btn--primary">Submit</button>
			</form>
		</section>
		<section>
			<h2>Pending invitations</h2>
			<p>next up: pending invites, clearing invite queue after acceptance etc</p>
		</section>
	</div>
</template>

<script>
import firebase from "firebase/app";

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
						this.db.collection('users').where("email", "==", invite.to)
							.get()
							.then((snapshot) => {
								if (!snapshot.empty) {
									let userDoc = this.db.collection('users').doc(snapshot.docs[0].id);

									userDoc.update({
										pendingInvites: firebase.firestore.FieldValue.arrayUnion({
											invite: docRef.id,
											inviteFrom: invite.fromUid
										})
									});
								}
							})
							.catch(err => {
								console.log(err);
							});
					})
					.catch((err) => {
						console.log(err);
					});
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
<style lang="scss">
	form {
		align-items: flex-start;
		display: flex;
	}
	.input-grp {
		flex-grow: 2;
		margin-right: 10px;
	}

	#email {
		width: 100%;
	}

	.btn {
		height: 38px;
	}

	.error {
		display: block;
	}
</style>
