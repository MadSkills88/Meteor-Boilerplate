import { Accounts } from 'meteor/accounts-base';
import { Router } from 'meteor/iron:router';

// Import to load these templates
import '../../ui/layouts/dashboard_layout.js';
import '../../ui/layouts/form_layout.js';
import '../../ui/layouts/main_layout.js';
import '../../ui/layouts/profile_layout.js';
import '../../ui/layouts/newpost_layout.js';
import '../../ui/layouts/post_layout.js';
import '../../ui/pages/dashboard.js';
import '../../ui/pages/login.js';
import '../../ui/pages/signup.js';
import '../../ui/pages/contact.js';
import '../../ui/pages/main.js';
import '../../ui/pages/profile.js';
import '../../ui/pages/forgot.js';
import '../../ui/pages/uploader.js';
import '../../ui/pages/files.js';
import '../../ui/pages/file.js';
import '../../ui/pages/newpost.js';
import '../../ui/pages/post.js';
import '../../ui/pages/loading.js';
import '../../ui/components/dashboard_navbar.js';

// Router.configure({
//     layoutTemplate: 'form_layout'
// });

Router.route('/', function () {
  if (Meteor.userId()) {
    this.redirect('/dashboard');
  }
  else  {
    this.layout('main_layout');
    this.render('main');
  }
});
Router.route('/login', function () {
  this.layout('form_layout');
  this.render('login');
});
Router.route('/signup', function () {
  this.layout('form_layout');
  this.render('signup');
});
Router.route('/forgot', function () {
  this.layout('form_layout');
  this.render('forgot');
});
Router.route('/contact', function () {
  this.layout('form_layout');
  this.render('contact');
});
Router.route('/dashboard', function () {
  this.layout('dashboard_layout');
  if (Meteor.userId()) {
    this.render('dashboard');
  }
  else {
    this.redirect('/login');
  }
});

Router.route('/profile', function () {
  this.layout('profile_layout');
  if (Meteor.userId()) {
    this.render('profile');
  }
  else {
    this.redirect('/login');
  }
});

Router.route('/newpost', function () {
  this.layout('newpost_layout');
  if (Meteor.userId()) {
    this.render('newpost');
  }
  else {
    this.redirect('/login');
  }
});

// Router.route('/post/:_id', {
//     template: 'post',
//     layoutTemplate: 'post_layout',
//     waitOn: function () {
//       return Meteor.subscribe('post', this.params._id);
//     },
//     data: function()  {
//       var post_id = this.params._id;
//       console.log(post_id);
//       return Posts.findOne({ _id: post_id });
//     }
// });

Router.route('/post/:_id', function () {
  this.layout('post_layout');
  this.render('post', {
//     waitOn: function () {
//       return Meteor.subscribe('post', this.params._id);
//     },
    data: function () {
      var post_id = this.params._id;
      console.log(post_id);
      return Posts.findOne({_id: post_id});
    }
  });
});

// Router.route('/post/:_id', {
//   // this template will be rendered until the subscriptions are ready
//   layoutTemplate: 'post_layout',
//   loadingTemplate: 'loading',
//   waitOn: function () {
//     // return one handle, a function, or an array
//     return Meteor.subscribe('post', this.params._id);
//   },
//   data: function () {
//       var post_id = this.params._id;
//       console.log(post_id);
//       return Posts.findOne({_id: post_id});
//   },
//   action: function () {
//     this.render('post');
//   },
//   fastRender:true
// });

// Router.route('/post/:_id', {
//     template: 'post',
//     layoutTemplate: 'post_layout',
//     loadingTemplate: 'loading',
//     waitOn: function () {
//       return Meteor.subscribe('post', this.params._id);
//     },
//     data: function()  {
//       var post_id = this.params._id;
//       console.log(post_id);
//       return Posts.findOne({ _id: post_id });
//     }
// });

Router.route('/verify-email/:_token', {
    controller : 'verify-email',
//     action : 'verifyEmail'
    action : function() {
        var verificationToken = this.params._token;
        console.log(verificationToken);
        Accounts.verifyEmail(verificationToken,  function(error) {
           if (error) {
               FlashMessages.sendError(error.reason);
           } else {
               Router.go('/');
               FlashMessages.sendSuccess('Email verified! Thanks!');
           }
        });
    }
});

// AccountController = RouteController.extend({
//     fastRender: true,
//     data: function () {},
//     onBeforeAction: function () {
//         this.render('Loading');
//         this.next();
//     },
//     verifyEmail: function() {
//         var verificationToken = this.params._token;
//         console.log(verificationToken);
//         Accounts.verifyEmail(verificationToken,  function(error) {
//            if (error) {
//                FlashMessages.sendError(error.reason);
//            } else {
//                Router.go('/');
//                FlashMessages.sendSuccess('Email verified! Thanks!');
//            }
//         });
//     }
// });

