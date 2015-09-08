var usersPageView = Backbone.View.extend({
  id: 'users-page',
  template: _.template( $('#users-page').html() ),
  initialize: function() {
    PageMixin.iniPage(this);
  },
  render: function() {
    PageMixin.renderPage(this);

    var u = new displayUsersView({ users: new Users() });
  } 
});

var displayUsersView = Backbone.View.extend({
  el: '#all-users-wrapper',
  initialize: function(options) {
    this.users = options.users;
    this.listenTo(this.users, 'sync', this.render);
  },
  render: function() {
    this.users.each(function(model) {
      var h = new userItemView({ model: model });
      this.$el.append( h.render().el );
    }, this);
  }
});

var userItemView = Backbone.View.extend({
  tagName: 'li',
  template: _.template( $('#users-item').html() ),
  initialize: function() {
    this.render();
  },
  render: function() {
    var html = this.template( this.model.toJSON() );
    this.$el.html( html );
    return this;
  },
  events: {
    'click .follow': 'followUser',
    'click .unfollow': 'unfollowUser'
  }
});

/*
 * TODO:
 * merge user profile and users profile views to reduce redundant code
 * */
var usersProfilePageView = Backbone.View.extend({
  id: 'users-profile-page',
  template: _.template( $('#users-profile-page').html() ),
  initialize: function() {
    $('#content').html( this.el );
    this.render();
  },
  render: function() {
    this.$el.html( this.template( this.model.attributes ) );
  } 
});
