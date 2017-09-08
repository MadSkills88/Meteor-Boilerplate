Slingshot.fileRestrictions( "uploadToAmazonS3", {
  allowedFileTypes: [ "image/png", "image/jpeg", "image/gif" ],
  maxSize: 1 * 1024 * 1024
});

Slingshot.createDirective( "uploadToAmazonS3", Slingshot.S3Storage, {
  bucket: "foobario-user-files",
  region: 'us-west-1',
  acl: "public-read",
  
  AWSAccessKeyId: process.env.AWSAccessKeyId,
  AWSSecretAccessKey: process.env.AWSSecretAccessKey,
  
  authorize: function () {
    console.log("well we got this far... so might as well not rage quit");
    let userFileCount = Files.find( { "userId": this.userId } ).count();
    return userFileCount < 3 ? true : false;
  },
  key: function ( file ) {
    console.log("well we got this far... so might as well not rage quit... again");
    var user = Meteor.users.findOne( this.userId );
    return user.emails[0].address + "/" + file.name;
  }
});
