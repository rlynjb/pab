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

// when user logs in, a firebase error is thrown
// unless browser is refresh
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
  submitUser: function(e) {
    e.preventDefault();

    fire.authWithPassword({
      email: $('#email').val(),
      password: $('#password').val()
    },
    function(error, authData) {
      if (error) {
        console.log('err in creating user', error);
      } else {
        // this is a hack to reload user data variables
        // in app.js
        document.location.reload(true);
        // Navigate to index page
        Backbone.history.navigate('');
        var v = new indexPageView();
      }
    });
  }
});
