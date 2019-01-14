<template>
  <select>
    <option
      :selected="opt.code === selection"
      v-for="opt in options"
      :value="opt.code"
      :key="opt.code"
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
      choices: null,
    }
  },
  mounted() {
    console.log('prettySelect mounted', this.selected)
    this.choices = new Choices(this.$el)
    this.$el.addEventListener('choice', this.onChoice)
  },
  destroyed() {
    this.choices.destroy()
  },
  methods: {
    onChoice(event) {
      this.$emit('prettySelect::onChoice', event.detail.choice)
    },
  },
  watch: {},
}
</script>
<style lang="scss">
@import '../assets/sass/variables';
@import '../assets/sass/mixins';
</style>