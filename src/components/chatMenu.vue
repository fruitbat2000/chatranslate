<template>
  <div class="chat-menu">
    <ul class="chat-menu__actions">
      <li @click="$emit('chatMenu::showOriginal')">Show original messages</li>
      <li>View contact</li>
      <li v-if="langUpdated">Update to {{newLang}}</li>
    </ul>
  </div>
</template>

<script>

export default {
  name: 'chatMenu',
  components: {},
  props: {
    langUpdated: {
      required: false,
      type: Boolean,
      default: false
    },
    newLang: {
      required: false,
      type: String,
      default: ''
    }
  },
  data() {
    return {}
  },
  mounted() {
    console.log('chat menu mounted')
  },
  methods: {},
  watch: {},
}
</script>
<style lang="scss">
@import '../assets/sass/variables';
@import '../assets/sass/mixins';

.chat-menu {
  background: $white;
  border-radius: 3px;
  padding: 10px;
  position: absolute;
  right: 20px;
  top: calc(100% - 20px);
  z-index: 2;

  .chat-menu__actions {
    li {
      border-bottom: 1px solid $primaryDark;
      padding: 5px 0;

      &:first-child {
        padding-top: 0;
      }

      &:last-child {
        border: none;
        padding-bottom: 0;
      }
    }
  }
}
</style>