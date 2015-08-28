var loginPageView = Backbone.View.extend({
  id: 'login-page',
  template: _.template( $('#login-page').html() ),
  initialize: function() {
    PageMixin.iniPage(this);
  },
  render: function() {
    PageMixin.renderPage(this);

    var l = new loginForm();
  }
});

var loginForm = Backbone.View.extend({
  el: '#login-form-wrapper',
  template: _.template( $('#login-form').html() ),
  initialize: function() {
    this.render();
  },
  render: function() {
    this.$el.html( this.template );
    return this;
  },
  events: {
    'click #submitUser': 'submitUser'
  },
  submitUser: function() {
    fire.authWithPassword({
      email: $('#email').val(),
      password: $('#password').val()
    },
    function(error, authData) {
      if (error) {
        console.log('err in creating user', error);
      } else {
        /*
         * Once logged in success, redirect user to index
         * */
        console.log('success, user id is ', authData);
        /*
         * Get User data we only need
         * */
        var userAuthData = {
          email: authData.password.email,
          profileImg: authData.password.profileImageURL,
          token: authData.token,
          sessionExpire: authData.expires
        };
        document.cookie = "name=" + userAuthData.token + "; expires=" + userAuthData.sessionExpire + ";";
        console.log('data data data ', userAuthData);
      }
    });
  }
});
