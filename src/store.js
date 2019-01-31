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
    newChat() {},
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
    setPrimaryLanguage() {},
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
            // update the local state
            // set a watch on the user in the db
            // store should update the db, the db should update the state where possible
            commit('setUser', doc.data())
            if (doc.data().chats.length > 0) {
              doc.data().chats.forEach(chat => dispatch('watchChat', chat))
            }

            if (doc.data().contacts.length > 0) {
              doc.data().contacts.forEach(contact => dispatch('watchContact', contact))
            }

            dispatch('watchUser', payload.user.uid)
          } else {
            // create a new user in the db
            // watch the new user
            // db updates the state
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
                // might be better to grab the data back from the db?
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
      console.log('watchChat')
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
      // set a watch on the user object and detect changes
      // if the change refers to adding a new chat or contact, watch these
      // update the state user object
      let userDoc = state.db.collection('users').doc(payload)

      userDoc.onSnapshot(doc => {
        console.log('watchUser', helpers.findUnique(doc.data().chats, state.user.chats))
        // check if chats have changed
        if (state.user.chats.join() !== doc.data().chats.join()) {
          // find the 'new' chat(s) and watch it
          let arr = helpers.findUnique(doc.data().chats, state.user.chats)
          arr.forEach(chat => {
            dispatch('watchChat', chat)
          })
        }

        if (state.user.contacts.join() !== doc.data().contacts.join()) {
          // find the 'new' contact(s) and watch it
          let arr = helpers.findUnique(doc.data().contacts, state.user.contacts)
          arr.forEach(contact => {
            dispatch('watchContact', contact)
          })
        }

        // set the user to capture changes on the state
        commit('setUser', doc.data())
      })
    }
  }
})
