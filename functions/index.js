const functions = require('firebase-functions');
const admin = require('firebase-admin');
const mgConfig = require('./mailgun.config');
const mailgun = require('mailgun-js')({apiKey: mgConfig.apiKey, domain: mgConfig.domain});

admin.initializeApp();

exports.sendTestEmail = functions.https.onRequest((request, response) => {
	let data = {
	  from: 'Excited User <me@samples.mailgun.org>',
	  to: 'vicki.keeley@gmail.com',
	  subject: 'Hello',
	  text: 'Testing some Mailgun awesomeness!'
	};

	mailgun.messages().send(data, (error, body) => {
    console.log(body)
  });

  response.send('yay!');
});