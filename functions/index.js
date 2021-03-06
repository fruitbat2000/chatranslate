const functions = require('firebase-functions')
const admin = require('firebase-admin')
const mgConfig = require('./mailgun.config')
const mailgun = require('mailgun-js')({
  apiKey: mgConfig.apiKey,
  domain: mgConfig.domain,
})
const { Translate } = require('@google-cloud/translate')
const translate = new Translate({
  projectId: 'chatranslate-218619',
})

admin.initializeApp()

exports.sendTestEmail = functions.https.onRequest((request, response) => {
  let data = {
    from: 'Excited User <me@samples.mailgun.org>',
    to: 'vicki.keeley@gmail.com',
    subject: 'Hello',
    text: 'Testing some Mailgun awesomeness!',
  }

  mailgun.messages().send(data, (error, body) => {
    console.log(body)
  })

  response.send('yay!')
})

exports.sendInvite = functions.firestore
  .document('invites/{inviteId}')
  .onCreate((snap, context) => {
    const invite = snap.data()
    console.log(snap.id)
    let data = {
      from: 'Fluentsy <noreply@fluentsy.app>',
      to: invite.to,
      subject: 'You have a new invite on Fluentsy',
      text:
        'Hi there!, ' +
        invite.fromName +
        '(' +
        invite.fromEmail +
        ') wants to chat with you on Fluentsy. Use the link below to accept their invite and start a conversation... \n http://localhost:8080/invite/' +
        snap.id,
    }

    console.log(invite, data)
    mailgun.messages().send(data, (error, body) => {
      console.log(body)
    })
  })

exports.getLangList = functions.https.onCall(data => {
  return translate
    .getLanguages(data.target)
    .then(result => {
      console.log(result)
      return result
    })
    .catch(err => {
      console.log(err)
    })
})

exports.translateMessage = functions.https.onCall(data => {
  const promises = []

  data.langs.forEach(lang => {
    if (lang !== data.message.language) {
      promises.push(
        translate.translate(data.message.original, {
          from: data.message.language,
          to: lang,
        })
      )
    } else {
      promises.push([data.message.original])
    }
  })
  return Promise.all(promises)
})
