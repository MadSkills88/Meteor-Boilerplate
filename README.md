# Foobario: A Comprehensive Meteor Boilerplate 
[![Travis CI Builds](https://travis-ci.org/MadSkills88/foobario.svg?branch=master)](https://travis-ci.org/MadSkills88/foobario/) [![Node.js](https://cdn.rawgit.com/aleen42/badges/master/src/node.svg)](#)

**How to use...**
Just clone it and set up an Amazon S3 account and configure your bucket and CORS policy
Instead of settings.json to store settings (Amazon keys) I used environmental variables (with heroku since it's hosted with heroku)

**Introduction**

Meteor is a full stack, opinionated Javascript MVC web framework useful for fast prototyping. It is built on top of node.js and supports packages from both Atmoshere and npm (as of v1.3). Meteor provides full stack reactivity (automatic rerun when a change in the data source is detected) and data on the wire, meaning that the server sends data, rather than html, that the client then renders. Meteor also uses DDP (distributed data protocol), which is a built-in pub/sub and RPC protocol based on JSON and built on top of SockJs (which emulates Websockets). Since one language, Javascript, is used on both the frontend (client) and backend (server), the code for the client and server are separate. While the client code runs inside a web browser, the server code runs inside a node.js container. As of v1.2, Meteor supports ecmascript ES2015/ES6 modules!!!

On the client side, Meteor supports several UI frameworks: Blaze, React, and Angular. Blaze, the built-in templating system, is built on Spacebars, a modified version of Handlebars. React is a component-based UI framework that uses JSX syntax (JSX is a preprocessor that adds XML to syntax to Javascript). React is eclipsing Blaze in popularity, but I personally liked BLaze's templates and the separation of javascript from html.

For routing, there are two main options available: Iron Router and Flow Router. Iron Router is built-in to Meteor, and generally speaking, it is simpler to implement, while Flow Router has better performance and enables nested routes and route groups. Iron Router responds to Meteor's reactivity, while Flow Router does not (reactivity is somewhat unreliable at times though). Furthermore, Iron Router only supports Blaze templates, while Flow Router supports Blaze, React, Angular, and more! However, Flow Router doesn not yet support server side routes...

Foobario comes equipped with user accounts built on the meteor accounts-base package (which relies on the Meteor DDP protocol). A verification email is sent, triggered by every account sign up event. Users have the ability to modify profile information and reset password. Admin account privileges are coming soon. 

Users also have the ability to upload files into an Amazon S3 bucket, https://foobario-user-files.s3-us-west-1.amazonaws.com/


**Technology:**

* **Meteor** (node.js framework), **Blaze** (templating engine), **Spacebars** (templating language), **MongoDB** (database), **LESS** (CSS preprocessor), **Iron Router** (router), **Amazon S3** (cloud storage)
* Module pattern using ECMAScript (Javascript specification) and ES2015/ES6 modules
* Hosted with Heroku

**Packages:**

* meteor-base@1.0.4             # Packages every Meteor app needs to have
* mobile-experience@1.0.4       # Packages for a great mobile UX
* mongo@1.1.14                   # The database Meteor supports right now
* blaze-html-templates@1.0.4    # Compile .html files into Meteor Blaze views
* reactive-var@1.0.11            # Reactive variable for tracker
* jquery                  # Helpful client-side library
* tracker@1.1.1                 # Meteor's client-side reactive programming library

* standard-minifier-css@1.3.2   # CSS minifier run for production mode
* standard-minifier-js    # JS minifier run for production mode
* es5-shim@4.6.15                # ECMAScript 5 compatibility for older browsers.
* ecmascript              # Enable ECMAScript2015+ syntax in app code

* iron:router
* twbs:bootstrap
* mrt:flash-messages
* accounts-password@1.3.2
* email@1.1.18
* ~~selaias:accounts-entry~~
* ~~cunneen:email-verifier~~
* ~~accounts-facebook@1.0.11~~
* ~~accounts-google@1.0.11~~
* ~~accounts-twitter@1.1.12~~
* accounts-ui@1.1.9
* ~~q42:accounts-microsoft~~
* ~~service-configuration@1.0.11~~
* ~~accounts-github@1.0.11~~
* ~~shell-server@0.2.1~~
* less
* sha
* edgee:slingshot
* fortawesome:fontawesome
* ecmascript-collections
* modules

**File Structure**
* We'll add this later

**Cloud Storage**
* Amazon S3 (AWS) https://foobario-user-files.s3-us-west-1.amazonaws.com/
* CORS configuration:
  ```
  <?xml version="1.0" encoding="UTF-8"?>
  <CORSConfiguration xmlns="http://s3.amazonaws.com/doc/2006-03-01/">
  <CORSRule>
      <AllowedOrigin>*</AllowedOrigin>
      <AllowedMethod>PUT</AllowedMethod>
      <AllowedMethod>POST</AllowedMethod>
      <AllowedMethod>GET</AllowedMethod>
      <AllowedMethod>HEAD</AllowedMethod>
      <MaxAgeSeconds>3000</MaxAgeSeconds>
      <AllowedHeader>*</AllowedHeader>
  </CORSRule>
  </CORSConfiguration>
  ```
* Bucket policy:
  ```
  {
     "Version": "2012-10-17",
     "Statement": [
         {
             "Sid": "PublicReadGetObject",
             "Effect": "Allow",
             "Principal": "*",
             "Action": "s3:GetObject",
             "Resource": "arn:aws:s3:::foobario-user-files/*"
         }
     ]
  }
  ```
* Region: us-west-1

**Change Log**
* Implemented post feature, allowing users to create posts that display content
* Configured file insert/update/delete with Amazon S3 (AWS)
* New signups require email verification: an email is sent with a confirmation url
* Added user accounts with profile update and change password functionality

**Resources**

https://docs.meteor.com/
https://atmospherejs.com/
https://themeteorchef.com/
