<template>
	<div class="chat">
    <header class="layer-1">
      <h3>
        <span v-for="member in chat.data.members" :key="member.uid" v-if="member.uid !== $store.state.user.uid">{{ member.displayName }}</span>
      </h3>
    </header>
    <div class="chat__messages">
      <div v-for="(msg, index) in chat.data.messages" :key="index" class="chat__message">
        {{ msg.original }}, {{ msg.from.displayName }}, {{ msg.timestamp | prettyDate }}
      </div>
    </div>
    <div class="chat__input input-grp layer-1">
      <input type="text" v-model="newMessage" placeholder="Enter text">
      <button @click.prevent="createMsg" class="btn btn--primary btn--round"><i class="material-icons">send</i></button>
    </div>
	</div>
</template>

<script>

export default {
	name: 'chat',
	components: {},
  props: {
    chat: {
      type: Object,
      required: true
    }
  },
	data() {
		return {
      db: this.$store.state.db,
      members: [],
      chatLoaded: false,
      newMessage: ''
    }
	},
	methods: {
    createMsg() {
      console.log('createMsg', this.newMessage);
      let msg = {
        original: this.newMessage,
        language: this.$store.state.user.primaryLanguage,
        from: this.$store.state.user,
        timestamp: Date.now(),
        translations: []
      }

      this.$store.dispatch('newMessage', {chatId: this.chat.id, msg: msg});
      //this.newMessage = '';
      // fire an action to update the db. with a bit (a lot) of luck, that will automatically update stuff
    }
  },
	mounted() {
    console.log('chat mounted');
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

    header {
      background: $primary;
      padding: 20px;

      h3 {
        margin: 0;
      }
    }

    .chat__input {
      background: $primaryDark;
      bottom: 0;
      box-sizing: border-box;
      display: flex;
      left: 0;
      padding: 10px 20px;
      position: absolute;
      width: 100%;

      input {
        box-sizing: border-box;
        margin-right: 10px;
        width: 100%;
      }
    }

    .chat__messages {
      padding-bottom: 50px;
    }
	}
</style>
