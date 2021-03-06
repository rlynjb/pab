/* ------------------------------------------------------------
 * GLOBALS
 * ------------------------------------------------------------
 * */
var fire = new Firebase('https://pab.firebaseio.com');
var apiUrl = 'https://pab.firebaseio.com';
var isUserLoggedIn = false;

var PageMixin = {
  iniPage: function(e) {
    $('#content').html( e.el );
    e.render(); 
  },
  renderPage: function(e) {
    e.$el.html( e.template );
  }
};

/* ------------------------------------------------------------
 * USER AUTHENTICATION
 * ------------------------------------------------------------
 * */
/*
 * Monitoring User Authentication State
 * */
// Callback which logs the current auth state
function authDataCallback(authData) {
  if (authData) {
    console.log("User " + authData.uid + " is logged in with " + authData.provider);
    isUserLoggedIn = true;
  } else {
    console.log("User is logged out");
    isUserLoggedIn = false;
  }
}
// Register the callback to be fired every time auth state changes
fire.onAuth(authDataCallback);

/* 
 * Storing User Data
 * */
// Best explanation of whats going on in this code
// http://stackoverflow.com/questions/27630574/storing-user-data-to-firebase-ends-up-storing-the-wrong-user
var isNewUser = true;

fire.onAuth(function(authData) {
  if (authData && isNewUser) {
    fire.child('users').child(authData.uid).set({
      provider: authData.provider,
      name: getName(authData),
      profileImageURL: authData.password.profileImageURL,
    });
  }
});

// find a suitable name based on the meta info given by each provider
function getName(authData) {
  switch(authData.provider) {
    case 'password':
      return authData.password.email.replace(/@.*/, '');
    case 'twitter':
      return authData.twitter.displayName;
    case 'facebook':
      return authData.facebook.displayName;
  }
}

// Store Data in User Model
var User = Backbone.Firebase.Model.extend({
  urlRoot: apiUrl + '/users'
});

var Users = Backbone.Firebase.Collection.extend({
  model: User,
  url: apiUrl + '/users'
});

var Follow = Backbone.Model.extend({});

var Follows = Backbone.Firebase.Collection.extend({
  model: Follow,
  url: apiUrl + '/follows'
});

// Get Logged in users' uid from localstorage
// so we can use this to get data from api
if (isUserLoggedIn) {
  var localStor = JSON.parse( localStorage.getItem('firebase:session::pab') );
  var userUID = localStor.uid;

  var qw = new User({ id: userUID });
  qw.fetch();
}
// ------------------------------------------------------------

var headerView = Backbone.View.extend({
  el: '#header-inner',
  template: _.template( $('#header-inner-content').html() ),
  initialize: function(options) {
    this.user = options.user;
    this.render();
  },
  render: function() {
    if (isUserLoggedIn) {
      var tplContent = this.template( this.user.attributes );
      this.$el.html( tplContent );
    }
    return this;
  }
});
var header = new headerView({ user: qw });

var footerView = Backbone.View.extend({
  el: '#footer-wrapper',
  template: _.template( $('#footer-content').html() ),
  initialize: function() {
    this.render();
  },
  render: function() {
    if (isUserLoggedIn) {
      this.$el.html( this.template );
    }
    return this;
  }
});
var footer = new footerView();

var aboutPageView = Backbone.View.extend({
  id: 'about-page',
  template: _.template( $('#about-page').html() ),
  initialize: function() {
    PageMixin.iniPage(this);
  },
  render: function() {
    PageMixin.renderPage(this);
  }
});
