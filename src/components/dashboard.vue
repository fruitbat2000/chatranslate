<template>
	<div class="dashboard">
		<h2>Yo, {{user.displayName}}! Welcome to your dashboard</h2>
		<div class="chats">
			<ul v-if="user.chats.length > 0" class="chats__list">
				<li @click="openChat(chat)" v-for="chat in user.chats" :key="chat">
					<chat-card :uid="chat" />
				</li>
			</ul>
			<div v-else class="chats__no-chats">You have no active conversations. Start chatting with someone by clicking the button below. Or <router-link to="/invite">invite</router-link> someone new to chat with.</div>
			<router-link to="/contacts" class="btn btn--primary btn--round layer-1 chats__start-chat"><i class="material-icons">chat</i></router-link>
		</div>
	</div>
</template>

<script>
import chatCard from '@/components/chatCard'

export default {
	name: 'dashboard',
	components: {
		chatCard
	},
	data() {
		return {
			user: this.$store.state.user
		}
	},
	mounted() {
		console.log('dashboard mounted');
	},
	computed: {
		
	}
}
</script>
<style lang="scss">
	.dashboard {
		.chats__start-chat {
			bottom:  40px;
			position: fixed;
			right: 40px;
		}
	}
</style>
