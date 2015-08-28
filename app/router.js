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
