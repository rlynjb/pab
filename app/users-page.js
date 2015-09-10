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
      // do not display same user as logged in user
      if (qw.id !== model.id) {
        var h = new userItemView({ model: model });
        this.$el.append( h.render().el );
      }
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
  },
  followUpdate: function() {
    console.log('toggle');
  },
  followUser: function(e) {
    e.preventDefault();

    var attr = {
      currentUser: qw.id,
      followUser: this.model.id
    }
    var f = new Follows();
    f.create(attr);

    /*
     * this function we'll toggle follow and unfollow button
     * */
    followUpdate();

    /*
     * NOTE:
     * Firebase does not seem to let me push items into a 
     * nested child item, might need to create a Following data set
     * instead of inserting it inside a users data
     * */
    //fire.child('users').child(qw.id).child('following').set(attr);
    /*
     * NOTE:
     * Firebase doesnt allow numeric array due to collision
     * Instead, it uses its unique keys generator
     * Approach below is a no-no
     * */
    /*
    var b = new User({ id: qw.id });
    b.get('following').push(this.model.id);
    b.save({}, {
      success: function(m, r, o) {
        console.log('success', r);
      },
      error: function(m, x, o) {
        console.log('error');
      }
    });*/
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
