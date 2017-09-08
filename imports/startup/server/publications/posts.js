Meteor.publish( 'posts', function(post_id) {
  var data = Posts.find( { "_id": post_id } );
  if ( data ) {
    return data;
  }
  return this.ready();
});
