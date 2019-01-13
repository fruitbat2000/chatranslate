import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import firebase from 'firebase/app'
import store from '@/store'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('./views/About.vue'),
    },
    {
      path: '/sign-in',
      name: 'signIn',
      component: () => import('./views/SignIn.vue'),
    },
    {
      path: '/invite',
      name: 'invite',
      component: () => import('./views/invite.vue'),
    },
    {
      path: '/invite/:id',
      name: 'acceptInvite',
      component: () => import('./views/acceptInvite.vue'),
    },
    {
      path: '/contacts',
      name: 'contacts',
      component: () => import('./views/contacts.vue'),
    },
    {
      path: '/settings',
      name: 'settings',
      component: () => import('./views/settings.vue'),
    },
  ],
})

router.beforeEach((to, from, next) => {
  if (
    !firebase.auth().currentUser &&
    to.name !== 'signIn' &&
    to.name !== 'home'
  ) {
    store.commit('setRedirectUrl', to)
    next('/sign-in')
  } else {
    next()
  }
  store.commit('setPageName', to.name)
})

export default router
