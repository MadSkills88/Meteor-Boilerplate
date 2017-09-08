import { Template } from 'meteor/templating';
import { Router } from 'meteor/iron:router';
import './signup.html';

Template.signup.events({
    "submit .form-signup": function(event){
        // event.preventDefault();

        var email = trimInput(event.target.email.value);
        var password = trimInput(event.target.password.value);
        var password2 = trimInput(event.target.password2.value);
        var first_name = trimInput(event.target.first_name.value);
        var last_name = trimInput(event.target.last_name.value);

        if(isNotEmpty(email) && isNotEmpty(password) &&
           isNotEmpty(first_name) && isNotEmpty(last_name) &&
           isEmail(email) && areValidPasswords(password, password2)) {
                Accounts.createUser({
                    email: email,
                    password: password,
                    profile: {
                        first_name: first_name,
                        last_name: last_name
                    }
                }, function(err){
                    if(err) {
                        FlashMessages.sendError(err.reason);
                    } else {
                        Meteor.call('sendVerificationEmail', (error, response) => {
                            if (error) {
                                FlashMessages.sendError(error.reason);
                            } else {
                                FlashMessages.sendSuccess('Account created successfully! You are now logged in.');
                            }
                        });
                        Router.go('/dashboard');
                    }
                });
        }
            // prevent submit
            return false;
    }
});

// form validation
// trim helper
var trimInput = function(val){
    return val.replace(/^\s*|\s*$/g, "");
}
// check empty fields
isNotEmpty = function(value){
    if(value && value !== '') {
        return true;
    }
    FlashMessages.sendError("Please fill in all the fields!");
    return false;
};
// validate email
isEmail = function(value){
    var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([([a-zA-Z0-9]{2,4})+$/;
    if(filter.test(value)) {
        return true;
    }
    FlashMessages.sendError("Please use a valid email address!");
    return false;
};
// validate password
isValidPassword = function(password){
    if(password.length < 8) {
        FlashMessages.sendError("Password must be at least 8 characters");
        return false;
    }
    return true;
}
// match passwords
areValidPasswords = function(password, confirm){
    if(!isValidPassword(password)) {
        return false;
    }
    if(password !== confirm) {
        FlashMessages.sendError("Passwords do not match!");
        return false;
    }
    return true;
}

