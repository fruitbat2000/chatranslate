<template>
  <div v-if="$store.state.languages" class="lang-selection">
    <pretty-select
      class="lang-selection__select"
      :selected="$store.state.user.primaryLanguage"
      :options="$store.state.languages"
      @prettySelect::onChoice="newLang"
    />
    <button
      @click="setLang"
      class="btn btn--primary"
      :class="{'btn--disabled': currentSelection === $store.state.user.primaryLanguage}"
    >Set</button>
  </div>
</template>

<script>
import prettySelect from '@/components/prettySelect'

export default {
  name: 'langSelection',
  components: {
    prettySelect,
  },
  data() {
    return {
      langs: this.$store.state.languages,
      currentSelection: this.$store.state.user.primaryLanguage,
    }
  },
  mounted() {
    if (!this.langs) {
      this.$store.dispatch('getLangs')
    }
  },
  methods: {
    newLang(e) {
      this.currentSelection = e.value
    },
    setLang() {
      if (this.currentSelection === this.$store.state.user.primaryLanguage) {
        return
      }

      // ultimately primary language will have to be changed on existing chats and messages back-translated
      this.$store.dispatch('setPrimaryLanguage', this.currentSelection)
    },
  },
  watch: {},
}
</script>
<style lang="scss">
@import '../assets/sass/variables';
@import '../assets/sass/mixins';

.lang-selection {
  display: flex;

  .choices {
    flex-grow: 2;
    margin: 0 10px 0 0;
  }
}
</style>