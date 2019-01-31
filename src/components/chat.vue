<template>
  <div class="chat">
    <header class="layer-1">
      <h3>
        <i @click="$emit('chat::close')" class="material-icons">arrow_back</i>
        <span
          v-for="member in otherMembers"
          :key="member.uid"
        >{{ member.displayName }}</span>
      </h3>
    </header>
    <div ref="messages" class="chat__messages">
      <message-card
        v-for="(msg, index) in chat.data.messages"
        :key="index"
        :message="msg"
        :lang="$store.state.user.primaryLanguage"
      />
    </div>
    <div class="chat__input input-grp layer-1">
      <input type="text" v-model="newMessage" placeholder="Enter text">
      <button @click.prevent="createMsg" class="btn btn--primary btn--round">
        <i class="material-icons">send</i>
      </button>
    </div>
  </div>
</template>

<script>
import messageCard from '@/components/messageCard'

export default {
  name: 'chat',
  components: {
    messageCard,
  },
  props: {
    chat: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      db: this.$store.state.db,
      chatLoaded: false,
      newMessage: '',
    }
  },
  methods: {
    createMsg() {
      let msg = {
          original: this.newMessage,
          language: this.$store.state.user.primaryLanguage,
          from: this.$store.state.user,
          timestamp: Date.now(),
          translations: {},
        },
        allLangs = this.chat.data.members.map(member => {
          return member.primaryLanguage
        }),
        langs = [...new Set(allLangs)]

      this.$store.dispatch('newMessage', {
        chatId: this.chat.id,
        message: msg,
        langs: langs,
      })

      msg.translations[msg.language] = msg.original
      this.chat.data.messages.push(msg)
      this.newMessage = ''
      this.$nextTick(() => {
        this.$refs.messages.scrollTop = this.$refs.messages.scrollHeight
      })
    },
  },
  mounted() {
    this.$refs.messages.scrollTop = this.$refs.messages.scrollHeight
  },
  filters: {
    prettyDate(timestamp) {
      let date = new Date(timestamp),
        day = date.getDate(),
        month = date.getMonth() + 1,
        year = date.getFullYear()

      return day + '/' + month + '/' + year
    },
  },
  computed: {
    otherMembers() {
      let arr = this.chat.data.members.filter(member => {
        return member.uid !== this.$store.state.user.uid
      })
      console.log(arr)
      return arr
    }
  },
  watch: {},
}
</script>
<style lang="scss">
@import '../assets/sass/variables';
@import '../assets/sass/mixins';

.chat {
  background: $surface;
  height: 100vh;
  left: 0;
  overflow: hidden;
  position: fixed;
  top: 0;
  width: 100vw;

  header {
    background: $primary;
    box-sizing: border-box;
    color: $logotype;
    height: 65px;
    padding: 20px;
    position: relative;
    z-index: 2;

    h3 {
      align-items: center;
      display: flex;
      margin: 0;

      i {
        cursor: pointer;
        margin-right: 10px;
      }
    }
  }

  .chat__input {
    background: $primaryDark;
    bottom: 0;
    box-sizing: border-box;
    display: flex;
    height: 65px;
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
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    height: calc(100vh - 65px - 65px);
    overflow: scroll;
    padding: 20px;
  }
}
</style>
