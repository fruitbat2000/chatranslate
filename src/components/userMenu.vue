<template>
  <div class="user-menu">
    <div class="user-menu__user">
      <div class="user-menu__avatar">
        <img
          v-if="$store.state.user.avatar"
          class="user-menu__image"
          :src="$store.state.user.avatar"
          alt
        >
        <i v-else class="material-icons no-avatar">person</i>
      </div>
      <div class="user-menu__info">
        <h3>{{$store.state.user.displayName}}</h3>
        <p>{{$store.state.user.email}}</p>
      </div>
    </div>
    <div class="user-menu__actions">
      <router-link to="/settings" class="user-menu__settings">
        <i class="material-icons">settings</i>
      </router-link>
      <button @click.prevent="signOut" class="btn btn--primary">Sign out</button>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase/app'

export default {
  name: 'userMenu',
  components: {},
  data() {
    return {}
  },
  mounted() {
    console.log('user menu mounted')
  },
  methods: {
    signOut() {
      firebase.auth().signOut()
      this.$router.push('/')
      this.$store.commit('setRedirectUrl', { path: '/' })
    },
  },
  watch: {},
}
</script>
<style lang="scss">
@import '../assets/sass/variables';
@import '../assets/sass/mixins';

.user-menu {
  background: $white;
  border-radius: 3px;
  padding: 10px;
  position: absolute;
  right: 20px;
  top: calc(100% - 20px);
  z-index: 2;

  .user-menu__user {
    align-items: center;
    border-bottom: 1px solid $surface;
    display: flex;
    padding-bottom: 10px;

    h3,
    p {
      margin: 0;
    }

    h3 {
      @include font-size(14);
    }

    p {
      @include font-size(12);
    }
  }

  .user-menu__avatar {
    height: 40px;
    margin-right: 10px;

    .no-avatar {
      @include font-size(30);
      color: $primaryDark;
      border: none;
      height: 40px;
      padding: 5px;
      width: 40px;
    }
  }

  .user-menu__actions {
    align-items: center;
    display: flex;
    justify-content: space-between;
    padding-top: 10px;

    .btn {
      height: auto;
    }

    .user-menu__settings {
      color: $primaryText;
      height: 24px;
    }
  }
}
</style>