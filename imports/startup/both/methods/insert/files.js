import { userFiles } from '../../../../api/namespaces.js';;

Meteor.methods({
  storeUrlInDatabase: function( url ) {
//     check( url, String );
    userFiles.both.checkUrlValidity( url );
    console.log("where's the doggone error?");
    try {
      Files.insert({
        url: url,
        userId: Meteor.userId(),
        added: new Date() 
      });
    } catch( exception ) {
      return exception;
      console.log("dagnabbit another exception!:");
      console.log(exception);
    }
  }
});
