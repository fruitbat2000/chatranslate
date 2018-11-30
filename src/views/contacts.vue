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
import firebase from "firebase/app";
import userCard from '@/components/userCard'

export default {
	name: 'contacts',
	components: {
		userCard
	},
	data() {
		return {
			db: this.$store.state.db
		}
	},
	methods: {
		startChat(contact) {
			console.log('startChat - create new chat and attach to users, then redirect to the chat page', contact)
			let chat = {
					members: [{uid: this.$store.state.user.uid, lang: 'en'}, {uid: contact, lang: 'es'}],
					messages: []
				},
				currentUserDoc = this.db.collection('users').doc(this.$store.state.user.uid),
				contactDoc = this.db.collection('users').doc(contact)

			this.db.collection('chats').add(chat)
				.then(docRef => {
					currentUserDoc.update({
						chats: firebase.firestore.FieldValue.arrayUnion(docRef.id)
					});

					contactDoc.update({
						chats: firebase.firestore.FieldValue.arrayUnion(docRef.id)
					});
				})
				.catch(err => {
					console.log(err)
				})

			// a chat would be posted to firebase in it's original language, then
			// 1. a recipient client would be notified of the new message and then request it in the desired language?
			// OR
			// 2. we know the desired language(s) in advance (ie they're set at the beginning of the chat or use a default)
			// and when the message is posted, translations are created automatically. Only the desired language is displayed

			// suspect 2. will be quicker.

			//	messages: [{
			//		original: '',
			//		language: '',
			//		from: '',
			//		translations: [{lang: '', text: ''},{lang: '', text: ''}]
			//	}]
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

