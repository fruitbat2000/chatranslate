<template>
  <div class="lang-selection">
    <pretty-select
      v-if="$store.state.languages"
      :selected="$store.state.user.primaryLanguage"
      :options="$store.state.languages"
    />
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
    }
  },
  mounted() {
    console.log('lang selection mounted', this.langs)
    if (!this.langs) {
      this.$store.dispatch('getLangs')
    }
  },
  methods: {},
  watch: {},
}
</script>
<style lang="scss">
@import '../assets/sass/variables';
@import '../assets/sass/mixins';
</style>