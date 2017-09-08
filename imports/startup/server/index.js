import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

import './accounts/emails.js';
import './methods/send-email.js';
import './methods/send-verification-link.js';
import './methods/update-email.js';
import './methods/update-password.js';
import './methods/check-password.js';

import './publications/files.js';
import './publications/posts.js';
// import './modules/_modules.js';
import './slingshot.js';

Meteor.startup(() => {
//     code to run on server at startup
//     process.env.MAIL_URL used to be on port 587... had to switch because for security reasons or whatever, 587 denied access, forcing me to use 465 --> http://blog.mailgun.com/25-465-587-what-port-should-i-use/
    process.env.MAIL_URL = 'smtps://postmaster%40sandbox6a58b51476574019b9f2ebc96170429a.mailgun.org:fe9dc262796e3be097271830308c63ea@smtp.mailgun.org:465';
});
