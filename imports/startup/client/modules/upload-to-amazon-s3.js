import { userFiles } from '../../../api/namespaces.js';;
import { Slingshot } from 'meteor/edgee:slingshot';

let template;

let _getFileFromInput = ( event ) => event.target.files[0];

let _setPlaceholderText = ( string = "Click or Drag a File Here to Upload" ) => {
  template.find( ".alert span" ).innerText = string;
};

let _addUrlToDatabase = ( url ) => {
  Meteor.call( "storeUrlInDatabase", url, ( error ) => {
    console.log("storing url in database");
    if ( error ) {
//       Bert.alert( error.reason, "warning" );
      console.log(error);
      _setPlaceholderText();
    } else {
//       Bert.alert( "File uploaded to Amazon S3!", "success" );
      console.log("File successfully uploaded to Amazon S3!");
      _setPlaceholderText();
    }
  });
};

let _uploadFileToAmazon = ( file ) => {
  const uploader = new Slingshot.Upload( "uploadToAmazonS3" );
  console.log("preparing to upload file");
  uploader.send( file, ( error, url ) => {
    if ( error ) {
      console.log("dagnabbit");
      console.log(error);
//       Bert.alert( error.message, "warning" );
      _setPlaceholderText();
    } else {
      console.log("uploading file...");
      _addUrlToDatabase( url );
    }
  });
};

let upload = ( options ) => {
  template = options.template;
  console.log(template);
  let file = _getFileFromInput( options.event );
  
  _setPlaceholderText( `Uploading ${file.name}...` );
  _uploadFileToAmazon( file );
};

userFiles.client.uploadToAmazonS3 = upload;
