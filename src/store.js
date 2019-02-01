import Vue from 'vue'
import Vuex from 'vuex'
import helpers from '@/assets/helpers/generalHelpers'
import firebase from 'firebase/app'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    authUi: null,
    authInitiated: false,
    user: null,
    db: null,
    redirectUrl: null,
    contacts: [],
    chats: [],
    pageName: '',
    languages: null,
  },
  mutations: {
    setAuthUi(state, payload) {
      state.authUi = payload.authInstance
    },
    setUser(state, payload) {
      state.authInitiated = true
      state.user = payload
    },
    updateUser(state, payload) {
      state.user[payload.property] = payload.value
    },
    setContacts(state, payload) {
      state.contacts = payload
    },
    setDbInstance(state, payload) {
      state.db = payload.db
    },
    setRedirectUrl(state, payload) {
      state.redirectUrl = payload.path
      localStorage.setItem('redirectUrl', payload.path)
    },
    updateContacts(state, payload) {
      let found = false
      state.contacts.forEach(contact => {
        if (contact.uid === payload.id) {
          contact = payload.data
          found = true
        }
      })

      if (!found) {
        state.contacts.push(payload.data)
      }
      
    },
    updateChats(state, payload) {
      let found = false
      state.chats.forEach(chat => {
        if (chat.id === payload.id) {
          chat.data = payload.data
          found = true
        }
      })

      if (!found) {
        state.chats.push(payload)
      }
    },
    setPageName(state, payload) {
      state.pageName = payload
    },
  },
  actions: {
    newChat({ dispatch, state }, payload) {
      let currentUserDoc = state.db.collection('users').doc(state.user.uid),
          contactDoc = state.db.collection('users').doc(payload.contact)

      return new Promise(resolve => {
        state.db.collection('chats')
        .add(payload.chat)
        .then(doc => {
          currentUserDoc.update({
            chats: firebase.firestore.FieldValue.arrayUnion(doc.id)
          })

          contactDoc.update({
            chats: firebase.firestore.FieldValue.arrayUnion(doc.id)
          })

          dispatch('watchChat', doc.id).then(data => {
            resolve(data);
          })
        })
      })
    },
    newMessage({ state }, payload) {
      let chatDoc = state.db.collection('chats').doc(payload.chatId)
      let translateMessage = firebase
        .functions()
        .httpsCallable('translateMessage')

      translateMessage(payload).then(results => {
        let msg = payload.message
        payload.langs.forEach((lang, i) => {
          msg.translations[lang] = results.data[i][0]
        })

        chatDoc.update({
          messages: firebase.firestore.FieldValue.arrayUnion(msg),
        })
      })
    },
    getLangs({ state }) {
      let getLangList = firebase.functions().httpsCallable('getLangList')

      getLangList({ target: state.user.primaryLanguage }).then(langs => {
        state.languages = langs.data[0]
      })
    },
    setPrimaryLanguage({ commit, state }, payload) {
      let userDoc = state.db.collection('users').doc(state.user.uid)
      userDoc
        .update({
          primaryLanguage: payload,
        })
        .then(() => {
          commit('updateUser', { property: 'primaryLanguage', value: payload })
        })
        .catch(err => {
          console.log(err)
        })
    },
    getUser({ commit, dispatch, state }, payload) {
      let userDoc = state.db.collection('users').doc(payload.user.uid)
      let [lang, locale] = (navigator.userLanguage || navigator.language)
        .replace('-', '_')
        .toLowerCase()
        .split('_')

      userDoc
        .get()
        .then(doc => {
          if (doc.exists) {
            commit('setUser', doc.data())
            if (doc.data().chats.length > 0) {
              doc.data().chats.forEach(chat => dispatch('watchChat', chat))
            }

            if (doc.data().contacts.length > 0) {
              doc.data().contacts.forEach(contact => dispatch('watchContact', contact))
            }

            dispatch('watchUser', payload.user.uid)
          } else {
            let user = {
              contacts: [],
              chats: [],
              pendingInvites: [],
              avatar: null,
              primaryLanguage: lang,
              locale: locale,
              displayName: payload.user.displayName,
              email: payload.user.email,
              verified: payload.user.emailVerified,
              phoneNumber: payload.user.phoneNumber,
              providerData: payload.user.providerData,
              uid: payload.user.uid,
              joined: Date.now(),
            }

            userDoc
              .set(user)
              .then(() => {
                commit('setUser', user)
                dispatch('watchUser', payload.user.uid)
              })
              .catch(err => {
                console.log(err)
              })
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    watchChat({ commit, state }, payload) {
      let chatDoc = state.db.collection('chats').doc(payload)

      return new Promise(resolve => {
        chatDoc.onSnapshot(doc => {
          commit('updateChats', { id: doc.id, data: doc.data() })
          resolve({ id: doc.id, data: doc.data() })
        })
      })
    },
    watchContact({ commit, state}, payload) {
      let contactDoc = state.db.collection('users').doc(payload)

      return new Promise(resolve => {
        contactDoc.onSnapshot(doc => {
          commit('updateContacts', { id: doc.id, data: doc.data() })
          resolve({ id: doc.id, data: doc.data() })
        })
      })
    },
    watchUser({ commit, state, dispatch }, payload) {
      let userDoc = state.db.collection('users').doc(payload)

      userDoc.onSnapshot(doc => {
        if (state.user.chats.join() !== doc.data().chats.join()) {
          let arr = helpers.findUnique(doc.data().chats, state.user.chats)
          arr.forEach(chat => {
            dispatch('watchChat', chat)
          })
        }

        if (state.user.contacts.join() !== doc.data().contacts.join()) {
          let arr = helpers.findUnique(doc.data().contacts, state.user.contacts)
          arr.forEach(contact => {
            dispatch('watchContact', contact)
          })
        }

        commit('setUser', doc.data())
      })
    }
  }
})
