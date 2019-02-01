<template>
  <div class="contacts">
    <h1>Contacts</h1>
    <template v-if="$store.state.contacts">
      <ul v-if="$store.state.contacts" class="contacts__list">
        <li @click="startChat(contact)" v-for="contact in $store.state.contacts" :key="contact.uid">
          <user-card :contact="contact" class="layer-1"></user-card>
        </li>
      </ul>
      <p v-else>You have no contacts,
        <router-link to="/invite">invite</router-link>someone to chat with!
      </p>
    </template>
    <chat v-if="chatOpen" :chat="$store.state.chats[this.chat]" @chat::close="closeChat"/>
  </div>
</template>

<script>
import userCard from '@/components/userCard'
import chat from '@/components/chat'

export default {
  name: 'contacts',
  components: {
    userCard,
    chat,
  },
  data() {
    return {
      db: this.$store.state.db,
      chatOpen: false,
      chat: null,
    }
  },
  methods: {
    openChat(chat) {
      this.chatOpen = true
      this.chat = this.$store.state.chats.indexOf(chat)
    },
    closeChat() {
      this.chatOpen = false
      this.chat = null
    },
    findChatByUser(arr, val) {
      let chat = false

      arr.forEach(item => {
        item.data.members.forEach(member => {
          if (member.uid === val) {
            chat = item
          }
        })
      })
      return chat
    },
    startChat(contact) {
      
      let user = this.$store.state.user,
        chat = {
          members: [
            {
              uid: user.uid, 
              displayName: user.displayName, 
              primaryLanguage: user.primaryLanguage
            }, 
            {
              uid: contact.uid, 
              displayName: contact.displayName,
              primaryLanguage: contact.primaryLanguage
            }
          ],
          messages: [],
          langs: {
            [user.uid]: user.primaryLanguage,
            [contact.uid]: contact.primaryLanguage
          }
        },
        existingChat = this.findChatByUser(this.$store.state.chats, contact.uid)

      console.log(chat)

      if (existingChat) {
        this.openChat(existingChat)
        return
      } else {
        this.$store.dispatch('newChat', {chat: chat, contact: contact.uid}).then(data => {
          let newChat
          this.$store.state.chats.forEach(chat => {
            if (chat.id === data.id) {
              newChat = chat
            }
          })
          this.openChat(newChat)
        })
      }
    },
  },
  mounted() {
    console.log('contacts mounted')
  },
  computed: {},
}
</script>
<style lang="scss">
.contacts {
  .contacts__list li {
    margin-bottom: 10px;
  }
}
</style>

