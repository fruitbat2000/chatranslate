<template>
  <div class="lang-selection">
    <pretty-select
      v-if="$store.state.user"
      :selected="$store.state.user.primaryLanguage"
      :options="[{name: 'German', val: 'de'},{name: 'English', val:'en'},{name: 'Spanish', val: 'es'}]"
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
    return {}
  },
  mounted() {
    console.log('lang selection mounted')
  },
  methods: {},
  watch: {},
}
</script>
<style lang="scss">
@import '../assets/sass/variables';
@import '../assets/sass/mixins';
</style>