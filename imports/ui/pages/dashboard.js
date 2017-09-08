import './dashboard.html';

Template.dashboard.helpers({
    firstName: function() {
        return Meteor.user().profile.first_name;
    },
    lastName: function() {
        return Meteor.user().profile.last_name;
    },
    email: function() {
        return Meteor.user().emails[0].address;
    }
});

Template.dashboard.events({
  'click .resend-verification-link' (event, template ) {
    Meteor.call('sendVerificationEmail', (error, response) => {
      if (error) {
        FlashMessages.sendError(error.reason);
      } else {
        let email = Meteor.user().emails[ 0 ].address;
//         FlashMessages.sendSuccess('Verification sent to ${ email }!');
        FlashMessages.sendSuccess('Verification email sent!');
      }
    });
  }
});
