import './post.html';

Template.post.onCreated( () => Template.instance().subscribe( 'posts', Router.current().params._id ) );
