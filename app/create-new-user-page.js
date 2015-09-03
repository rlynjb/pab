var User = Backbone.Model.extend({});

var Users = Backbone.Firebase.Collection.extend({
  model: User,
  url: apiUrl + '/users'
});

var createPageView = Backbone.View.extend({
  id: 'create-account-page',
  template: _.template( $('#create-account-page').html() ),
  initialize: function() {
    PageMixin.iniPage(this);
  },
  render: function() {
    PageMixin.renderPage(this);

    // Child Views
    // Views inside this page
    var c = new createNewUserForm({ users: new Users() });
  }
});

var createNewUserForm = Backbone.View.extend({
  el: '#create-new-user-wrapper',
  template: _.template( $('#create-new-user-form').html() ),
  initialize: function(options) {
    this.users = options.users;
    this.render();
  },
  render: function() {
    this.$el.html( this.template );
    return this;
  },
  events: {
    'click #submitNewUser': 'submitNewUser'
  },
  submitNewUser: function() {
    /* TODO
     * When new user is created
     * Also POST a new user json data to hold atleast UID and email
     * This is so we can still view other users on All Users page
     * and view logged in user's own profile by comparing UID from localStorage
     * and UID from json data
     * */
    var tt = this;

    // Create New User in Firebase server
    fire.createUser({
      email: $('#email').val(),
      password: $('#password').val()
    },
    function(error, userData) {
      if (error) {
        console.log('err in creating user', error);
      } else {
        console.log('success, user id is ', userData.uid);

        // Create a record of new user in pab api
        console.log('userdata', userData);
        tt.users.create(userData);

        // Navigate to index page
        Backbone.history.navigate('login');
        var l = new loginPageView();
      }
    });
  }
});
