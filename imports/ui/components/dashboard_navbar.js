import { Template } from 'meteor/templating';
import { Router } from 'meteor/iron:router';
import './dashboard_navbar.html';

Template.dashboard_navbar.events({
    "click .logout": function(event){
        Meteor.logout(function(err){
            if(err) {
                FlashMessages.sendError(err.reason);
            } else {
                FlashMessages.sendSuccess("You are now logged out successfully.");
                Router.go('/');
            }
        });
    }
});
