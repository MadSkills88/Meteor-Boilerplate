import { Template } from 'meteor/templating';
import { Router } from 'meteor/iron:router';
import './contact.html';

Template.contact.events({
  'click button' : function () {
    var fromEmail = $(".fromEmail").val();
//     var toEmail = $(".toEmail").val();
    var toEmail = 'anthonybao1999@gmail.com'
    var mailSubject = $(".mailSubject").val();
    var messageBody = $(".messageBody").val();
    Meteor.call("sendEmail", fromEmail, toEmail, mailSubject, messageBody);
  }
});
