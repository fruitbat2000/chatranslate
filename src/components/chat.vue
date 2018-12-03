<template>
	<div class="chat">
    <header class="layer-1">
      <h3>
        <span v-for="member in chat.data.members" :key="member.uid" v-if="member.uid !== $store.state.user.uid">{{ member.displayName }}</span>
      </h3>
    </header>
    <div class="chat__messages">
      <div v-for="(index, msg) in chat.data.messages" :key="index" class="chat__message">
        {{ msg.text }}, {{ msg.from }}, {{ msg.timestamp }}
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
      console.log('createMsg');
    }
  },
	mounted() {
    console.log('chat mounted');
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
