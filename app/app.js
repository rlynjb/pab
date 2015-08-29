var fire = new Firebase('https://pab.firebaseio.com');
var isUserLoggedIn = false;


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


var PageMixin = {
  iniPage: function(e) {
    $('#content').html( e.el );
    e.render(); 
  },
  renderPage: function(e) {
    e.$el.html( e.template );
  }
};


var headerView = Backbone.View.extend({
  el: '#header-inner',
  template: _.template( $('#header-inner-content').html() ),
  initialize: function() {
    this.render();
  },
  render: function() {
    this.$el.html( this.template );
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
