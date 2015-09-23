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
    'photo/:id': 'photoPage',
    'users': 'usersPage',
    'users/:id': 'usersProfilePage'
  },
  indexPage: function() {
    if (!isUserLoggedIn) {
      Backbone.history.navigate('login');
      this.view = new loginPageView();
    } else {
      header.render();
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

    // remove header footer
    header.remove();
    footer.remove();
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
      var pp = new PhotoP({ id: id });
      this.view = new photoPageView({ model: pp });
    }
  },
  usersPage: function() {
    if (!isUserLoggedIn) {
      Backbone.history.navigate('login');
      this.view = new loginPageView();
    } else {
      this.view = new usersPageView();
    }
  },
  usersProfilePage: function(id) {
    if (!isUserLoggedIn) {
      Backbone.history.navigate('login');
      this.view = new loginPageView();
    } else {
      var g = new User({ id: id });
      this.view = new usersProfilePageView({ model: g });
    }
  }
});

var approuter = new AppRouter();
Backbone.history.start();
