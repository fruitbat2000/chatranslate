<template>
	<div class="user-card">
		<img v-if="contact.avatar" class="user-card__image" :src="contact.avatar" alt="">
		<i v-else class="material-icons no-avatar">person</i>
		<div class="user-card__info">
			<h3>{{contact.displayName}}</h3>
			<p>Member since: {{contact.joined | prettyDate}}</p>
		</div>
	</div>
</template>

<script>

	export default {
		name: 'userCard',
		components: {

		},
		props: {
			contact: {
				required: true,
				type: Object
			}
		},
		data() {
			return {}
		},
		mounted() {},
		methods: {},
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

	.user-card {
		align-items: center;
		background-color: $white;
		border-bottom-left-radius: 40px;
		border-bottom-right-radius: 3px;
		border-top-left-radius: 40px;
		border-top-right-radius: 3px;
		display: flex;
		height: 80px;

		.user-card__image,
		.no-avatar {
			border-radius: 50%;
			height: 76px;
			margin-left: 2px;
			margin-top: 1px;
			width: 76px;
		}

		.user-card__info {
			padding: 5px 5px 5px 20px;

			h3, p {
				margin: 0;
			}

			p {
				@include font-size(12);
			}
		}
	}
	
</style>