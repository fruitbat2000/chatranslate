<template>
  <div id="app">
    <main-header></main-header>
    <main-nav></main-nav>
    <main>
      <router-view/>
    </main>
  </div>
</template>

<script>
  import mainHeader from '@/components/mainHeader';
  import mainNav from '@/components/mainNav';

  export default {
    name: 'app',
    components: {
      mainHeader,
      mainNav
    },
    data() {
      return {
        
      }
    },
    mounted() {
      console.log('app mounted');
    },
    methods: {
      
    },
    watch: {
      
    }
  }
</script>

<style lang="scss">
  @import './assets/sass/base';

  main {
    padding: 20px;
  }
</style>
