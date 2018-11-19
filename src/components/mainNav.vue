<template>
	<nav class="main-nav">
		<ul>
			<li><router-link to="/">Chats</router-link></li>
			<li><router-link to="/contacts">Contacts</router-link></li>
			<li><router-link to="/invite">Invites</router-link></li>
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

				a {
					color: $primaryText;
					display: block;
					padding: 10px 20px;
					text-decoration: none;

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
				}

				.router-link-exact-active:after {
					background-color: $secondary;
				}
			}
		}
	}
</style>