var AppRouter = Backbone.Router.extend({
  initialize: function() {
  },
  routes: {
    '': 'indexPage',
    'login': 'loginPage',
    'logout': 'logoutPage',
    'create': 'createAccountPage',
    'about': 'aboutPage',
    'upload': 'uploadPhotoPage',
    'user/:uid': 'userProfilePage'
  },
  indexPage: function() {
    if (!isUserLoggedIn) {
      Backbone.history.navigate('login');
      this.view = new loginPageView();
    } else {
      this.view = new indexPageView();
    }
  },
  loginPage: function() {
    this.view = new loginPageView();
  },
  logoutPage: function() {
    // Logs out user
    fire.unauth();
    Backbone.history.navigate('login');
    this.view = new loginPageView();
    header.render();
  },
  createAccountPage: function() {
    this.view = new createPageView();
  },
  aboutPage: function() {
    this.view = new aboutPageView();
  },
  uploadPhotoPage: function() {
    if (!isUserLoggedIn) {
      Backbone.history.navigate('login');
      this.view = new loginPageView();
    } else {
      this.view = new uploadPhotoPageView();
    }
  },
  userProfilePage: function(uid) {
    if (!isUserLoggedIn) {
      Backbone.history.navigate('login');
      this.view = new loginPageView();
    } else {
      this.view = new userProfilePageView();
    }
  }
});

var approuter = new AppRouter();
Backbone.history.start();
