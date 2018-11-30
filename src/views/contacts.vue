<template>
	<div class="contacts">
		<h1>Contacts</h1>
		<template v-if="$store.state.user">
			<ul v-if="$store.state.user.contacts.length > 0" class="contacts__list">
				<li @click="startChat(contact)" v-for="contact in $store.state.user.contacts" :key="contact">
					<user-card :uid="contact" class="layer-1"></user-card>
				</li>
			</ul>
			<p v-else>You have no contacts,
				<router-link to="/invite">invite</router-link>
					someone to chat with!
			</p>
		</template>
	</div>
</template>

<script>
import userCard from '@/components/userCard'

export default {
	name: 'contacts',
	components: {
		userCard
	},
	data() {
		return {

		}
	},
	methods: {
		startChat(contact) {
			console.log('startChat', contact)
		}
	},
	mounted() {
		console.log('contacts mounted');
	},
	computed: {
		
	}
}
</script>
<style lang="scss">
	.contacts {
		.contacts__list li {
			margin-bottom: 10px;
		}
	}
</style>

