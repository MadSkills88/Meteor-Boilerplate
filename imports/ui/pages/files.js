import { Template } from 'meteor/templating';
import { Router } from 'meteor/iron:router';
import './files.html';

Template.files.onCreated( () => Template.instance().subscribe( 'files' ) );

Template.files.helpers({
  files() {
    var files = Files.find( {}, { sort: { "added": -1 } } );
    if ( files ) {
      return files;
    }
  }
});
