Meteor.methods({
  storePostInDatabase: function( post_title, post_content, post_tags ) {
    try {
      Posts.insert({
        title: post_title,
        content: post_content,
        tags: post_tags,
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
