import { Template } from 'meteor/templating';
import { Router } from 'meteor/iron:router';
import { userFiles } from "../../api/namespaces.js";
import './file.html';

Template.file.helpers({
  isImage( url ) {
    const formats = [ 'jpg', 'jpeg', 'png', 'gif' ];
    return _.find( formats, ( format ) => url.indexOf( format ) > -1 );
  }
});

Template.file.events({
  'click .delete'(event, template) {
//     Tasks.remove(this._id);
  Meteor.call('removeUrlFromDatabase', this._id);
  }
});
