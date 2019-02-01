<template>
  <div id="app">
    <main-header></main-header>
    <main-nav></main-nav>
    <main>
      <router-view/>
    </main>
    <modal />
  </div>
</template>

<script>
import mainHeader from '@/components/mainHeader'
import mainNav from '@/components/mainNav'
import modal from '@/components/modal'

export default {
  name: 'app',
  components: {
    mainHeader,
    mainNav,
    modal
  },
  data() {
    return {}
  },
  mounted() {
    console.log('app mounted')
  },
  methods: {},
  watch: {},
}
</script>

<style lang="scss">
@import './assets/sass/base';

main {
  padding: 20px;
}
</style>
