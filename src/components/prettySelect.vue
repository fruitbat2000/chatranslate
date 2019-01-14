<template>
  <select>
    <option
      :selected="opt.val === selection"
      v-for="opt in options"
      :value="opt.val"
      :key="opt.val"
    >{{opt.name}}</option>
  </select>
</template>

<script>
import Choices from 'choices.js'

export default {
  name: 'prettySelect',
  components: {},
  props: {
    options: {
      type: Array,
      required: true,
    },
    selected: {
      type: String,
      required: false,
    },
  },
  data() {
    return {
      selection: this.selected,
    }
  },
  mounted() {
    console.log('prettySelect mounted', this.selected)
    const choices = new Choices(this.$el)
  },
  methods: {},
  watch: {},
}
</script>
<style lang="scss">
@import '../assets/sass/variables';
@import '../assets/sass/mixins';
</style>