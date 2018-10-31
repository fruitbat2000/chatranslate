<template>
	<nav class="main-nav">
		<ul>
			<li class="active"><router-link to="/">Chats</router-link></li>
			<li><a href="">Contacts</a></li>
			<li><a href="">Invites</a></li>
		</ul>
	</nav>
</template>

<script>

	export default {
		name: 'mainNav',
		components: {

		},
		data() {
			return {
				
			}
		},
		mounted() {
			console.log('nav mounted');
		},
		methods: {
			
		},
		watch: {
			
		}
	}
</script>
<style lang="scss">
	@import '../assets/sass/variables';
	@import '../assets/sass/mixins';

	.main-nav {
		background-color: $primaryLight;

		ul {
			li {
				display: inline-block;
				position: relative;

				&:after {
					background-color: transparent;
					bottom: 0;
					content: '';
					display: block;
					height: 3px;
					left: 0;
					position: absolute;
					width: 100%;
				}

				a {
					color: $primaryText;
					display: block;
					padding: 10px 20px;
					text-decoration: none;
				}
			}

			.active:after {
				background-color: $secondary;
			}
		}
	}
</style>