<template>
  <header class="main-header">
    <router-link to="/">
      <h1 class="logotype">fluentsy</h1>
    </router-link>
    <router-link to="/sign-in" v-if="$store.state.authInitiated && !$store.state.user">Sign in</router-link>
    <button
      class="main-header__btn"
      v-if="$store.state.authInitiated && $store.state.user"
      @click="menuOpen = !menuOpen"
    >
      <img
        v-if="$store.state.user.avatar"
        class="main-header__image"
        :src="$store.state.user.avatar"
        alt
      >
      <i v-else class="material-icons no-avatar">person</i>
    </button>
    <user-menu v-if="menuOpen" class="layer-1"/>
  </header>
</template>

<script>
import firebase from 'firebase/app'
import userMenu from '@/components/userMenu'

export default {
  name: 'mainHeader',
  components: {
    userMenu,
  },
  data() {
    return {
      menuOpen: false,
    }
  },
  mounted() {
    console.log('header mounted')
    document.addEventListener(
      'click',
      event => {
        let el = document.getElementsByClassName('main-header')
        if (!el[0].contains(event.target)) {
          this.menuOpen = false
        }
      },
      false
    )
  },
  methods: {
    signOut() {
      firebase.auth().signOut()
      this.$router.push('/')
      this.$store.commit('setRedirectUrl', { path: '/' })
    },
  },
  watch: {
    '$store.state.pageName'() {
      this.menuOpen = false
    },
  },
}
</script>
<style lang="scss">
@import '../assets/sass/variables';
@import '../assets/sass/mixins';

.main-header {
  align-items: center;
  background-color: $primary;
  display: flex;
  justify-content: space-between;
  padding: 20px;
  position: relative;

  a {
    text-decoration: none;
  }

  .logotype {
    @include font-size(36);
    color: $logotype;
    font-family: $montReg;
    margin: 0;
  }

  .main-header__btn {
    cursor: pointer;
    height: 38px;
    outline: none;
    padding-bottom: 0;
  }

  .no-avatar {
    @include font-size(24);
    border: 2px solid $logotype;
    color: $logotype;
    height: 35px;
    padding: 3px;
    width: 35px;
  }
}
</style>