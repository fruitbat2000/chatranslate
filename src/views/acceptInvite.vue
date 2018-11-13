<template>
	<div class="accept-invite">
		<div v-if="invite">
			<h2>{{invite.fromName}} wants to chat!</h2>
			<p>Date invited: {{invite.timestamp | prettyDate}}</p>
		</div>
		<p v-if="doesNotExist">Sorry, this invite does not seem to be valid</p>
		<p v-if="expired">Sorry, this invite has expired</p>
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
