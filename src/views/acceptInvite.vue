<template>
	<div class="accept-invite">
		<div v-if="invite" class="accept-invite__details">
			<h2>{{invite.fromName}} wants to chat!</h2>
			<user-card v-if="invite" :uid="invite.fromUid" class="layer-1"></user-card>
			<p>Date invited: {{invite.timestamp | prettyDate}}</p>
			<div class="actions">
				<button @click="acceptInvite" class="btn btn--primary layer-1">Accept</button>
				<button @click="declineInvite" class="btn btn--secondary layer-1">Decline</button>
			</div>
		</div>
		<p v-if="doesNotExist">Sorry, this invite does not seem to be valid</p>
		<p v-if="expired">Sorry, this invite has expired</p>
	</div>
</template>

<script>
import firebase from "firebase/app";
import userCard from '@/components/userCard'

export default {
	name: 'acceptInvite',
	components: {
		userCard
	},
	data() {
		return {
			db: this.$store.state.db,
			inviteId: this.$route.params.id,
			doesNotExist: false,
			expired: false,
			invite: null,
			expiry: 48 * 60 * 60 * 1000
		}
	},
	mounted() {
		this.checkInvite();
	},
	methods: {
		checkInvite() {
			let invDoc = this.db.collection('invites').doc(this.$route.params.id),
					_this = this;
			
			invDoc.get().then(function(doc) {
				if (doc.exists) {
					_this.checkExpiry(doc.data());
				} else {
					_this.doesNotExist = true;
				}
			}).catch(function(error) {
				console.log("Error getting document:", error);
			});
		},
		checkExpiry(data) {
			let currentTime = Date.now(),
					timeElapsed = currentTime - data.timestamp;

			if (timeElapsed > this.expiry) {
				this.expired = true;
			} else {
				this.invite = data;
			}
			
		},
		acceptInvite() {
			console.log('acceptInvite: update both users contact lists, delete invite and redirect to contacts');
			let currentUserDoc = this.db.collection('users').doc(this.$store.state.user.uid),
					inviterDoc = this.db.collection('users').doc(this.invite.fromUid),
					invDoc = this.db.collection('invites').doc(this.$route.params.id);

			currentUserDoc.update({
				contacts: firebase.firestore.FieldValue.arrayUnion(this.invite.fromUid)
			});

			inviterDoc.update({
				contacts: firebase.firestore.FieldValue.arrayUnion(this.$store.state.user.uid)
			});

		},
		declineInvite() {
			console.log('declineInvite: delete invite and redirect to home');
		},
		deleteInvite() {
			console.log('deleteInvite');
		}
	},
	computed: {
		
	},
	filters: {
		prettyDate(timestamp) {
			let date = new Date(timestamp),
					day = date.getDate(),
					month = date.getMonth() +1,
					year = date.getFullYear();

			return day+'/'+month+'/'+year;
		}
	}
}
</script>

<style lang="scss">
	@import '../assets/sass/variables';
	@import '../assets/sass/mixins';

	.accept-invite {
		.actions {
			display: flex;

			.btn {
				flex-grow: 1;

				&:first-child {
					margin-right: 20px;
				}
			}
		}
	}
</style>
