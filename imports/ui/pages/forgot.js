import { Template } from 'meteor/templating';
import { Router } from 'meteor/iron:router';
import './forgot.html';

Template.forgot.events({
    "submit .form-forgot": function(event) {
        var email = event.target.email.value;
	console.log(email);
        Accounts.forgotPassword({email: email}, function(error, result) {
            if (error) {
                console.log(error.reason);
            } else {
                FlashMessages.sendSuccess("Password reset email sent!");
            }
        });
        // prevent submit
        return false;
    }
});
