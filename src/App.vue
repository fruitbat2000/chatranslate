<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/sign-in" v-if="sharedState.authInitiated && !sharedState.user">Sign in</router-link>
    </div>
    <router-view/>
  </div>
</template>

<script>
  import store from './store';

  export default {
    name: 'app',
    components: {
      
    },
    data() {
      return {
        sharedState: store.state
      }
    },
    mounted() {
      console.log('app mounted', this.sharedState.user);
    },
    methods: {
      
    },
    watch: {
      
    }
  }
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
