Meteor.methods({
    sendEmail: function(fromEmail, toEmail, mailSubject, messageBody) {
        Email.send({
            from: fromEmail,
            to: toEmail,
            subject: mailSubject,
            text: messageBody
        });
    }
});
