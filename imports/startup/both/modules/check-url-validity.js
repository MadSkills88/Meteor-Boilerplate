import { userFiles } from '../../../api/namespaces.js';

let _fileExistsInDatabase = ( url ) => {
  return Files.findOne( { "url": url, "userId": Meteor.userId() }, { fields: { "_id": 1 } } );
};

let _isNotAmazonUrl = ( url ) => {
//   return ( url.indexOf( 's3.amazonaws.com' ) < 0 );
  return ( url.indexOf( '.amazonaws.com' ) < 0 );
};

let _validateUrl = ( url ) => {
  if ( _fileExistsInDatabase( url ) ) {
    return { valid: false, error: "Sorry, this file already exists!" };
  }

  if ( _isNotAmazonUrl( url ) ) {
    return { valid: false, error: "Sorry, this isn't a valid URL!" };
  }

  return { valid: true };
};

let validate = ( url ) => {
  console.log("validating...");
  let test = _validateUrl( url );
  console.log(test);
  if ( !test.valid ) {
    throw new Meteor.Error( "file-error", test.error );
  }
};

userFiles.both.checkUrlValidity = validate;
