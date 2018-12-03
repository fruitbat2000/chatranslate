<template>
	<div class="chat">
    <header>
      <h3 v-if="chatLoaded">
        <span v-for="member in members" :key="member.uid">{{ member.displayName }}</span>
      </h3>
    </header>
    <div class="chat__messages">
      <div v-for="(index, msg) in chat.messages" :key="index" class="chat__message">
        {{ msg }}
      </div>
    </div>
    <div class="chat__input">
      <input type="text" v-model="newMessage" placeholder="Enter text">
    </div>
	</div>
</template>

<script>

export default {
	name: 'chat',
	components: {},
  props: {
    chatId: {
      type: String,
      required: true
    }
  },
	data() {
		return {
      db: this.$store.state.db,
      chat: {},
      members: [],
      chatLoaded: false,
      newMessage: ''
    }
	},
	methods: {
    getChat() {
      let chatDoc = this.db.collection('chats').doc(this.chatId);

      chatDoc.get().then((doc) => {
        if (doc.exists) {
          this.chat = doc.data();
          this.filterUsers();
        } else {
          this.chat = null;
        }

        this.chatLoaded = true;
      });
    },
    filterUsers() {
      let currentUser = this.$store.state.user.uid;

      this.chat.members.forEach(member => {
        if (member.uid !== currentUser) {
          let memberDoc = this.db.collection('users').doc(member.uid)
          memberDoc.get()
            .then(doc => {
              this.members.push(doc.data());
            })
            .catch(err => {
              console.log(err)
            })
          console.log(this.members)
        }
      });
    }
  },
	mounted() {
    console.log('chat mounted');
    this.getChat();
	},
	computed: {
		
	}
}
</script>
<style lang="scss">
  @import '../assets/sass/variables';
  @import '../assets/sass/mixins';

	.chat {
    background: $surface;
    height: 100vh;
    left: 0;
    overflow: scroll;
    position: fixed;
    top: 0;
    width: 100vw;

    .chat__input {
      bottom: 0;
      position: absolute;
      left: 0;
      width: 100%;

      input {
        width: 100%;
      }
    }

    .chat__messages {
      padding-bottom: 50px;
    }
	}
</style>
