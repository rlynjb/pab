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


// Getting Authenticated User Data from localStorage
// that came from Firebase library
var userSettings = Backbone.Model.extend({
  initialize: function() {
    this.u = localStorage.getItem('firebase:session::pab');
    this.parseU = JSON.parse(this.u);
    this.info = {
      uid: this.parseU.uid,
      profileImageURL: this.parseU.password.profileImageURL,
      email: this.parseU.password.email
    }         
  }
});


var headerView = Backbone.View.extend({
  el: '#header-inner',
  template: _.template( $('#header-inner-content').html() ),
  initialize: function(options) {
    this.user = options.user;
    this.render();
  },
  render: function() {
    if (isUserLoggedIn) {
      var tplContent = this.template(this.user.info);
      this.$el.html( tplContent );
    } else {
      this.$el.html( this.template(this) );
    }
    return this;
  }
});
var header = new headerView({ user: new userSettings() });

var indexPageView = Backbone.View.extend({
  id: 'index-page',
  template: _.template( $('#index-page').html() ),
  initialize: function() {
    PageMixin.iniPage(this);
  },
  render: function() {
    PageMixin.renderPage(this);
  }
});

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
