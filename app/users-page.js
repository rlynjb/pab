var usersPageView = Backbone.View.extend({
  id: 'users-page',
  template: _.template( $('#users-page').html() ),
  initialize: function() {
    PageMixin.iniPage(this);
  },
  render: function() {
    PageMixin.renderPage(this);

    var u = new displayUsersView({ users: new Users(), follows: new Follows() });
  } 
});

var displayUsersView = Backbone.View.extend({
  el: '#all-users-wrapper',
  initialize: function(options) {
    this.users = options.users;
    this.follows = options.follows;
    this.parentView = this;

    this.listenTo(this.users, 'sync', this.renderTpl);
  },
  renderTpl: function() {
    this.listenTo(this.follows, 'sync', this.render);
  },
  render: function() {
    this.users.each(function(model) {
      // do not display same user as logged in user
      if (qw.id !== model.id) {
        var currentUser = qw.id,
            followUser = model.id,
            fStatus = 'Follow';
        //console.log('model: ', model);

        /* NOTE: 
         * search thru follow items
         * if there is user id and this models id
         * if there is, display unfollow
         * if there is none, display follow
         * */
        this.follows.each(function(fmodel) {
          var recCurrentUser = fmodel.attributes.currentUser,
              recFollowUser = fmodel.attributes.followUser;
          //console.log('fmodel: ', fmodel);

          if (currentUser == recCurrentUser && followUser == recFollowUser) {
            fStatus = 'Unfollow';
          } 
        }, this);

        // Print views template for user item
        //console.log('fstatus: ', fStatus);
        var h = new userItemView({ model: model, ffStatus: fStatus, pView: this.parentView });
        this.$el.append( h.render().el );
      }
    }, this);
  }
});

var userItemView = Backbone.View.extend({
  tagName: 'li',
  template: _.template( $('#users-item').html() ),
  events: {
    'click .Follow': 'followUser',
    'click .Unfollow': 'unfollowUser'
  },
  initialize: function(options) {
    this.ffs = new Follows();
    this.fStatus = options.ffStatus;
    this.parentView = options.pView;
    this.attr = {
      currentUser: qw.id,
      followUser: this.model.id
    }

    this.render();
  },
  render: function() {
    var data = this.model.toJSON();

    var html = this.template({ id: data.id, name: data.name, followStatus: this.fStatus });
    this.$el.html( html );
    return this;
  },
  unfollowUser: function(e) {
    e.preventDefault();

    /*
     * TODO
     * use attr below to remove item in follows collection
     * search thru follows collection
     * compare each item with attr
     * use firebase api to remove item
     * */
    /*
     * NOTE
     * code below works but it throws model.attributes undefined on line 98
     * might be a syncing/loading issue
     * */
    this.ffs.each(function(model) {
      var recCurrentUser = model.attributes.currentUser,
          recFollowUser = model.attributes.followUser,
          recItemID = model.id;

      if (this.attr.currentUser == recCurrentUser && this.attr.followUser == recFollowUser) {
        fire.child('follows').child(recItemID).remove();
      }

      // re-render displayUserList
      $('#'+ this.parentView.el.id).html(' ');
      this.parentView.render();
    }, this);

  },
  followUser: function(e) {
    e.preventDefault();

    this.ffs.create(this.attr);

    // re-render displayUserList
    $('#'+ this.parentView.el.id).html(' ');
    this.parentView.render();

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
