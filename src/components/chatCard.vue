<template>
  <div class="chat-card">
    <img
      v-if="chat.data.members.length > 0 && chat.data.members[0].avatar"
      class="chat-card__image"
      :src="chat.data.members[0].avatar"
      alt
    >
    <i v-else class="material-icons no-avatar">person</i>
    <div class="chat-card__info">
      <h3>
        <span
          v-for="member in chat.data.members"
          :key="member.uid"
          v-if="member.uid !== $store.state.user.uid"
        >{{member.displayName}}</span>
      </h3>
      <p
        v-if="chat.data.messages.length > 0"
      >{{ chat.data.messages[chat.data.messages.length -1].translations[$store.state.user.primaryLanguage] }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'chatCard',
  components: {},
  props: {
    chat: {
      required: true,
      type: Object,
    },
  },
  data() {
    return {}
  },
  mounted() {
    console.log('chatCard mounted', this.chat)
  },
  methods: {},
  filters: {
    prettyDate(timestamp) {
      let date = new Date(timestamp),
        day = date.getDate(),
        month = date.getMonth() + 1,
        year = date.getFullYear()

      return day + '/' + month + '/' + year
    },
  },
  watch: {},
}
</script>
<style lang="scss">
@import '../assets/sass/variables';
@import '../assets/sass/mixins';

.chat-card {
  align-items: center;
  background-color: $white;
  border-bottom-left-radius: 40px;
  border-bottom-right-radius: 3px;
  border-top-left-radius: 40px;
  border-top-right-radius: 3px;
  display: flex;
  height: 80px;

  .chat-card__image,
  .no-avatar {
    border-radius: 50%;
    height: 76px;
    margin-left: 2px;
    margin-top: 1px;
    width: 76px;
  }

  .chat-card__info {
    padding: 5px 5px 5px 20px;

    h3,
    p {
      margin: 0;
    }

    p {
      @include font-size(12);
    }
  }
}
</style>