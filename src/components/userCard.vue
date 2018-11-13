<template>
	<div class="user-card">
		<template v-if="user && userLoaded">
			<img class="user-card__image" src="" alt="">
			<div class="user-card__info">
				<h3>{{user.displayName}}</h3>
				<p>Member since: {{user.joined | prettyDate}}</p>
			</div>
		</template>		
		<p v-if="!user">Cannot retrieve user info</p>
	</div>
</template>

<script>

	export default {
		name: 'userCard',
		components: {

		},
		props: {
			uid: {
				required: true,
				type: String
			}
		},
		data() {
			return {
				db: this.$store.state.db,
				userLoaded: false,
				user: {}
			}
		},
		mounted() {
			console.log('userCard mounted', this.uid);
			this.getUser();
		},
		methods: {
			getUser() {
				let userDoc = this.db.collection('users').doc(this.uid),
						_this = this;

				userDoc.get().then((doc) => {
					if (doc.exists) {
						console.log(doc.data());
						_this.user = doc.data();
					} else {
						_this.user = null;
					}
					_this.userLoaded = true;
				});
			}
		},
		filters: {
			prettyDate(timestamp) {
				let date = new Date(timestamp),
						day = date.getDate(),
						month = date.getMonth() +1,
						year = date.getFullYear();

				return day+'/'+month+'/'+year;
			}
		},
		watch: {
			
		}
	}
</script>
<style lang="scss">
	@import '../assets/sass/variables';
	@import '../assets/sass/mixins';

	
</style>