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
    var c = new createNewUserForm();
  }
});

var createNewUserForm = Backbone.View.extend({
  el: '#create-new-user-wrapper',
  template: _.template( $('#create-new-user-form').html() ),
  initialize: function() {
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
    fire.createUser({
      email: $('#email').val(),
      password: $('#password').val()
    },
    function(error, userData) {
      if (error) {
        console.log('err in creating user', error);
      } else {
        console.log('success, user id is ', userData.uid);
      }
    });
  }
});
