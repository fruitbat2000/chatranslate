<template>
  <div class="lang-selection">
    <pretty-select
      v-if="$store.state.languages"
      :selected="$store.state.user.primaryLanguage"
      :options="$store.state.languages"
      @prettySelect::onChoice="newLang"
    />
    <button @click="setLang" class="btn btn--primary">Set</button>
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
      currentSelection: null,
    }
  },
  mounted() {
    console.log('lang selection mounted', this.langs)
    if (!this.langs) {
      this.$store.dispatch('getLangs')
    }
  },
  methods: {
    newLang(e) {
      this.currentSelection = e.value
    },
    setLang() {
      console.log(this.currentSelection)
      this.$store.dispatch('setPrimaryLanguage', this.currentSelection)
    },
  },
  watch: {},
}
</script>
<style lang="scss">
@import '../assets/sass/variables';
@import '../assets/sass/mixins';
</style>