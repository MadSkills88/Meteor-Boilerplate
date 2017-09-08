Meteor.methods( {
    updatePassword: function(password)  {
//         Accounts.setPassword(Meteor.userId(), password);
        Accounts.setPassword(Meteor.userId(), password, {logout: false});
    }
});
