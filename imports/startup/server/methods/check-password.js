Meteor.methods({
  checkPassword: function(password) {
    if (Meteor.userId()) {
      var user = Meteor.user();
//       var password = {password: password, algorithm: 'sha-256'};
      var result = Accounts._checkPassword(user, password);
      console.log(result);
      return result.error == null;
    } else {
      return false;
    }
  }
});
