//var fire = new Firebase('https://pab.firebaseapp.com');

var PageView = Backbone.View.extend({
  initialize: function() {
    $('#content').html( this.el );
    this.render();
  },
  render: function() {
    this.$el.html( this.template );
  }
});

var indexPageView = PageView.extend({
  id: 'index-page',
  template: _.template( $('#index-page').html() ),
});

var loginPageView = PageView.extend({
  id: 'login-page',
  template: _.template( $('#login-page').html() ),
});

var createPageView = PageView.extend({
  id: 'create-account-page',
  template: _.template( $('#create-account-page').html() ),
});

var aboutPageView = PageView.extend({
  id: 'about-page',
  template: _.template( $('#about-page').html() ),
});

var AppRouter = Backbone.Router.extend({
  initialize: function() {
  },
  routes: {
    '': 'indexPage',
    'login': 'loginPage',
    'create': 'createAccountPage',
    'about': 'aboutPage'
  },
  indexPage: function() {
    this.view = new indexPageView();
  },
  loginPage: function() {
    this.view = new loginPageView();
  },
  createAccountPage: function() {
    this.view = new createPageView();
  },
  aboutPage: function() {
    this.view = new aboutPageView();
  }
});

var approuter = new AppRouter();
Backbone.history.start();
