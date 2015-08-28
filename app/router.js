var AppRouter = Backbone.Router.extend({
  initialize: function() {
  },
  routes: {
    '': 'indexPage',
    'login': 'loginPage',
    'logout': 'logoutPage',
    'create': 'createAccountPage',
    'about': 'aboutPage'
  },
  indexPage: function() {
    this.view = new indexPageView();
  },
  loginPage: function() {
    this.view = new loginPageView();
  },
  logoutPage: function() {
    // Logs out user
    fire.unauth();
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
