import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import firebase from "firebase/app";

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('./views/About.vue')
    },
    {
      path: '/sign-in',
      name: 'signIn',
      component: () => import('./views/SignIn.vue')
    },
    {
      path: '/invite',
      name: 'invite',
      component: () => import('./views/invite.vue')
    },
    {
      path: '/invite/:id',
      name: 'acceptInvite',
      component: () => import('./views/invite.vue')
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (!firebase.auth().currentUser && to.name !== 'signIn') {
    next('/sign-in');
  } else {
    next();
  }
  
});

export default router
