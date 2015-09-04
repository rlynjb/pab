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
    'user': 'userProfilePage',
    'photo/:id': 'photoPage'
  },
  indexPage: function() {
    if (!isUserLoggedIn) {
      Backbone.history.navigate('login');
      this.view = new loginPageView();
    } else {
      header.render();
      this.view = new indexPageView();
      document.location.reload(true);
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
  userProfilePage: function() {
    if (!isUserLoggedIn) {
      Backbone.history.navigate('login');
      this.view = new loginPageView();
    } else {
      this.view = new userProfilePageView({ user: qw });
    }
  },
  photoPage: function(id) {
    if (!isUserLoggedIn) {
      Backbone.history.navigate('login');
      this.view = new loginPageView();
    } else {
      var pp = new Photo({ id: id });
      this.view = new photoPageView({ model: pp });
    }
  }
});

var approuter = new AppRouter();
Backbone.history.start();
