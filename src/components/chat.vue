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
      <i @click="menuOpen = !menuOpen" class="material-icons">more_vert</i>
      <chat-menu v-if="menuOpen" class="layer-1" />
    </header>
    <div ref="messages" class="chat__messages">
      <p>It looks as though you have messages in your history that do not match your current language settings. Perhaps you updated your primary language?</p>
      <p>We've archived them for now. If you want, you can <a href="">translate them to {{ primaryLangName }}</a></p>
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
import chatMenu from '@/components/chatMenu'
import helpers from '@/helpers/generalHelpers'

export default {
  name: 'chat',
  components: {
    messageCard,
    chatMenu
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
      menuOpen: false
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
    },
  },
  mounted() {
    console.log(this.chat, this.chat.data.langs[this.$store.state.user.uid], this.$store.state.user.primaryLanguage)
    this.$refs.messages.scrollTop = this.$refs.messages.scrollHeight
    if (this.langUpdated) {
      alert('lang change')
    }
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
      
      return arr
    },
    langUpdated() {
      return this.chat.data.langs[this.$store.state.user.uid] !== this.$store.state.user.primaryLanguage
    },
    primaryLangName() {
      return helpers.getItemByKeyValue(this.$store.state.languages, 'code', this.$store.state.user.primaryLanguage).name
    }
  },
  watch: {
    'chat.data.messages.length'() {
      this.$nextTick(() => {
        this.$refs.messages.scrollTop = this.$refs.messages.scrollHeight
      })
    }
  },
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
    display: flex;
    height: 65px;
    justify-content: space-between;
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
