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
    'user/:uid': 'userProfilePage',
    'photo/:id': 'photoPage'
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
  },
  photoPage: function(id) {
    if (!isUserLoggedIn) {
      Backbone.history.navigate('login');
      this.view = new loginPageView();
    } else {
      var pp = new Photo({ id: id });
      pp.fetch({
        success: function() {
          console.log('ss');
        },
        error: function(collection, response, options) {
          console.log('ee', response);
        }
      });
      console.log(pp);
      this.listenTo(pp, 'sync', function() {
        this.view = new photoPageView({ model: pp });
      });
    }
  }
});

var approuter = new AppRouter();
Backbone.history.start();
