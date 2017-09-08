import { Template } from 'meteor/templating';
import { Router } from 'meteor/iron:router';
import { userFiles } from "../../api/namespaces.js";
import './uploader.html';

Template.uploader.events({
  'change input[type="file"]' ( event, template ) {
    console.log("file has been selected");
    userFiles.client.uploadToAmazonS3( { event: event, template: template } );
  }
});
