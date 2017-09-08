Meteor.methods( {
    updateEmail: function(address)  {
        var oldEmail = Meteor.users.findOne(Meteor.userId).emails[0].address;
//         Accounts.addEmail(Meteor.userId(), address, true);
        if(oldEmail !== address)    {
            Accounts.addEmail(Meteor.userId(), address);
            Accounts.removeEmail(Meteor.userId(), oldEmail);
        }
    }
});
