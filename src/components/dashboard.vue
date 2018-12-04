<template>
	<div class="dashboard">
		<h2>Yo, {{user.displayName}}! Welcome to your dashboard</h2>
		<div class="chats">
			<ul v-if="$store.state.chats.length > 0" class="chats__list">
				<li @click="openChat(chat)" v-for="chat in $store.state.chats" :key="chat.id">
					<chat-card :chat="chat" class="layer-1" />
					{{chat.id}}
				</li>
			</ul>
			<div v-else class="chats__no-chats">You have no active conversations. Start chatting with someone by clicking the button below. Or <router-link to="/invite">invite</router-link> someone new to chat with.</div>
			<router-link to="/contacts" class="btn btn--primary btn--round layer-1 chats__start-chat"><i class="material-icons">chat</i></router-link>
		</div>
		<chat v-if="chatOpen" :chat="$store.state.chats[this.chat]" @chat::close="closeChat" />
	</div>
</template>

<script>
import chatCard from '@/components/chatCard'
import chat from '@/components/chat'

export default {
	name: 'dashboard',
	components: {
		chatCard,
		chat
	},
	data() {
		return {
			user: this.$store.state.user,
			chatOpen: false,
			chat: null
		}
	},
	methods: {
		openChat(chat) {
			console.log('openChat', chat);
			this.chatOpen = true;
			this.chat = this.$store.state.chats.indexOf(chat);
			console.log(this.chat)
		},
		closeChat() {
			this.chatOpen = false;
			this.chat = null;
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
