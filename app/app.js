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
/*
 * TODO
 * May need to transfer this to Model class instead
 * May include advance stuff in Model, parse method
 * */
/*
 * TODO
 * find a way to wrap this in model so we can rerender when we call in action
 * */
if (isUserLoggedIn) {
  var u = localStorage.getItem('firebase:session::pab');
  var parseU = JSON.parse(u);
  var userInfo = {
    uid: parseU.uid,
    profileImageURL: parseU.password.profileImageURL,
    email: parseU.password.email
  }
}


var headerView = Backbone.View.extend({
  el: '#header-inner',
  template: _.template( $('#header-inner-content').html() ),
  initialize: function() {
    this.render();
  },
  render: function() {
    if (isUserLoggedIn) {
      var tplContent = this.template(userInfo);
      this.$el.html( tplContent );
    } else {
      this.$el.html( this.template(this) );
    }
    return this;
  }
});
var header = new headerView();

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
