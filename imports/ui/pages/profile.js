import {Template} from 'meteor/templating';
import {Router} from 'meteor/iron:router';
import './profile.html';

Template.profile.helpers({
    firstName: function() {
//         return Meteor.user().profile.first_name;
        return Meteor.users.findOne(Meteor.userId).profile.first_name;
    },
    lastName: function() {
//         return Meteor.user().profile.last_name;
        return Meteor.users.findOne(Meteor.userId).profile.last_name;
    },
    email: function() {
//         return Meteor.user().emails[0].address;
        return Meteor.users.findOne(Meteor.userId).emails[0].address;
    }
});

Template.profile.events({
    "submit #update-profile-form": function(event) {
        // event.preventDefault();        
        var first_name = trimInput(event.target.first_name.value);
        var last_name = trimInput(event.target.last_name.value);
        var email = trimInput(event.target.email.value);
       	
        if (isNotEmpty(first_name)) {
            Meteor.users.update({
                _id: Meteor.userId()
            }, {
                $set: {
                    "profile.first_name": first_name
                }
            });
        }
        if (isNotEmpty(last_name)) {
            Meteor.users.update({
                _id: Meteor.userId()
            }, {
                $set: {
                    "profile.last_name": last_name
                }
            });
        }
        if (isNotEmpty(email) && isEmail(email)) {
            Meteor.call('updateEmail', email, function(error) {
                if (error) {
			console.log("got an error " + error.reason);
		}
            });
        }
    	FlashMessages.sendSuccess("Profile information successfully updated!");
        return false;

        //         Meteor.users.update({_id: Meteor.userId()}, {$set: {"profile.first_name": first_name}});
        // //get old email
        // const oldEmail = Meteor.users.findOne(this.userId).emails[0].address;

        // //add new email
        // Accounts.addEmail(this.userId, args.email);

        // //remove old email
        // Accounts.removeEmail(this.userId, oldEmail);

        // 	Meteor.users.update(
        // 		Meteor.userId(),
        // 		{$set: {
        // 	// 				"emails.0.address": email,
        // 			"profile.first_name": first_name,
        // 			"profile.last_name": last_name
        // 			}
        // 		}
        // 	);
    },

"submit #change-password-form": function(event) {
        // event.preventDefault();        
        var oldpassword = trimInput(event.target.oldpassword.value);
        var password = trimInput(event.target.password.value);
        var password2 = trimInput(event.target.password2.value);
       	
        if (isNotEmpty(oldpassword) && isNotEmpty(password) && isNotEmpty(password2) && areValidPasswords(password, password2))   {
// 			var digest = Package.sha.SHA256(oldpassword);
			Meteor.call('checkPassword', oldpassword, function(error, result)	{
				if(result)	{
					console.log("passwords match!");
					Meteor.call('updatePassword', password, function(error) {
						if(error) {
							console.log("got an error " + error.reason);
						}
						else	{
							console.log("Successfully set new password!");
							FlashMessages.sendSuccess("Password successfully changed!");
						}
					});
				}
				else	{
					FlashMessages.sendError("Incorrect password. Verification failed.");
					console.log(error);
				}
			});
        }
        return false;
    }
});

// form validation
// trim helper
var trimInput = function(val) {
    return val.replace(/^\s*|\s*$/g, "");
}
// check empty fields
isNotEmpty = function(value) {
    if (value && value !== '') {
        return true;
    }
};
// validate email
isEmail = function(value) {
    var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([([a-zA-Z0-9]{2,4})+$/;
    if (filter.test(value)) {
        return true;
    }
    FlashMessages.sendError("Please use a valid email address!");
    return false;
};
// validate password
isValidPassword = function(password) {
    if (password.length < 8) {
        FlashMessages.sendError("Password must be at least 8 characters");
        return false;
    }
    return true;
}
// match passwords
areValidPasswords = function(password, confirm) {
    if (!isValidPassword(password)) {
        return false;
    }
    if (password !== confirm) {
        FlashMessages.sendError("Passwords do not match!");
        return false;
    }
    return true;
}
