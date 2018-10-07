import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'

import firebase from "firebase/app";
import 'firebase/firestore';
import * as firebaseui from 'firebaseui';
import 'firebaseui/dist/firebaseui.css';

const config = {
  apiKey: "AIzaSyAbIgWIKY02k19aYWM_TP4q0tdggcZ3qqM",
  authDomain: "chatranslate-218619.firebaseapp.com",
  databaseURL: "https://chatranslate-218619.firebaseio.com",
  projectId: "chatranslate-218619",
  storageBucket: "chatranslate-218619.appspot.com",
  messagingSenderId: "666806704863"
};

const uiConfig = {
	signInSuccessUrl: '/about',
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID
  ],
  tosUrl: '/about',
  privacyPolicyUrl: function() {
    window.location.assign('/about');
  }
}

firebase.initializeApp(config);

let ui = new firebaseui.auth.AuthUI(firebase.auth());

ui.start('#firebaseui-auth-container', uiConfig);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
