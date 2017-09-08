// import { userFiles } from '../../../../api/namespaces.js';;

// Meteor.methods({
//   removeUrlFromDatabase: function( url ) {
//     try {
//       Files.remove(this._id);
//     } catch( exception ) {
//       return exception;
//       console.log(exception);
//     }
//   }
// });

Meteor.methods({
  removeUrlFromDatabase: function (file_id){
//     check( selectedPhoto, String );
    // Current User
    var currentUserId = Meteor.userId();

    // Get the URL of the photo they are trying to remove.
    var currentFile = Files.findOne( { '_id': file_id, 'userId': currentUserId }, { fields: { 'url': 1 } } );

    // Our photo bucket, e.g. 'mybucket'
    var bucket = "foobario-user-files";
    
    var region = 'us-west-1';

    // URL string: e.g. https://mybucket.s3.amazonaws.com/images/myimage.jpg is saved in DB,
    // I only want: 'images/myimage.jpg'
    var currentFileUrl = currentFile.url.replace('https://' + bucket + '.s3-' + region + '.amazonaws.com/', '');
    console.log(currentFileUrl);


    AWS.config.update({
      accessKeyId: process.env.AWSAccessKeyId,
      secretAccessKey: process.env.AWSSecretAccessKey,
    });

    var s3 = new AWS.S3();
    var params = {
      Bucket: bucket,
      Key: currentFileUrl
    };

    var deleteObject = Meteor.wrapAsync(
      s3.deleteObject(params, function (error, data) {
        if (error) {
          console.log(error);
        }
        else {
          console.log(data);
        }
      })
    );
    // Remove the entry in the database. (Want to only trigger this if there is no error from Amazon).
    Files.remove({_id: file_id, userId: currentUserId});
  }
});
