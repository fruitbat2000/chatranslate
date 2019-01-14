import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase/app'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    authUi: null,
    authInitiated: false,
    user: null,
    db: null,
    redirectUrl: null,
    contacts: null,
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
    updateChats(state, payload) {
      state.chats.forEach((chat, i) => {
        if (chat.id === payload.id) {
          state.chats.splice(i, 1)
        }
      })
      state.chats.push(payload)
      console.log('updateChats', payload, state.chats)
    },
    setPageName(state, payload) {
      state.pageName = payload
    },
  },
  actions: {
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
        .then(function(doc) {
          if (doc.exists) {
            console.log('getUser, doc exists')
            commit('setUser', doc.data())
            dispatch('getContacts', payload.user.uid)
            dispatch('getChats', doc.data().chats)
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
              .then(function() {
                // might be better to grab the data back from the db?
                commit('setUser', user)
              })
              .catch(function(error) {
                console.error('Error writing document: ', error)
              })
          }
        })
        .catch(function(error) {
          console.log('Error getting document:', error)
        })
    },
    getContacts({ commit, state }, payload) {
      state.db
        .collection('users')
        .doc(payload)
        .onSnapshot(doc => {
          let tmp = [],
            total = doc.data().contacts.length,
            length = 0

          doc.data().contacts.forEach(contact => {
            state.db
              .collection('users')
              .doc(contact)
              .get()
              .then(doc => {
                length++
                tmp.push(doc.data())

                if (length === total) {
                  console.log('all finished', tmp)
                  commit('setContacts', tmp)
                }
              })
              .catch(err => {
                console.log(err)
              })
          })
        })
    },
    getChats({ commit, state }) {
      state.db
        .collection('users')
        .doc(state.user.uid)
        .get()
        .then(doc => {
          let chats = doc.data().chats

          chats.forEach(chat => {
            let chatDoc = state.db.collection('chats').doc(chat)

            chatDoc.onSnapshot(doc => {
              commit('updateChats', { id: doc.id, data: doc.data() })
            })
          })
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
  },
})
