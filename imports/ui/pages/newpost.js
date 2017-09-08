import { Template } from 'meteor/templating';
import { Router } from 'meteor/iron:router';
import './newpost.html';

Template.newpost.events({
    "submit #new-post-form": function(event) {
        var post_title = trimInput(event.target.post_title.value);
        var post_content = trimInput(event.target.post_content.value);
        var post_tags = trimInput(event.target.post_tags.value);
	console.log(post_title);
	console.log(post_content);
	console.log(post_tags);
	console.log("form submitted...");
        if (isNotEmpty(post_title) && isNotEmpty(post_content)) {
		console.log("storing post in database...");
			Meteor.call("storePostInDatabase", post_title, post_content, post_tags, function(error)	{
				if(error)	{
					console.log("There was a problem uploading your post");
					console.log(error);
				}
				else	{
					console.log("successfully posted!");
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
