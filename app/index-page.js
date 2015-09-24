var indexPageView = Backbone.View.extend({
  id: 'index-page',
  template: _.template( $('#index-page').html() ),
  initialize: function() {
    PageMixin.iniPage(this);
  },
  render: function() {
    PageMixin.renderPage(this);

    var g = new displayFollowedPhotos({ follows: new Follows(), photos: new Photos() });
  }
});

var displayFollowedPhotos = Backbone.View.extend({
  el: '#followed-photos',
  initialize: function(options) {
    this.follows = options.follows;
    this.photos = options.photos;

    this.listenTo(this.photos, 'sync', null);
    this.listenTo(this.follows, 'sync', this.render);
  },
  render: function() {
    this.follows.each(function(fmodel) {
      var recCurrentUser = fmodel.attributes.currentUser,
          currentUser = qw.id,
          recFollowUser = fmodel.attributes.followUser;

      /* NOTE:
       * checking follow collection if there is a record that
       * matches my current ID to follow user record id and get
       * IDs of what users im following
       */
      if (currentUser == recCurrentUser) {
        var fu = new User({ id: recFollowUser });

        this.listenTo(fu, 'sync', function() {
          var fName = fu.attributes.name;
          var fImage = fu.attributes.profileImageURL;

          this.photos.each(function(pmodel) {
            var followPhotoUID = pmodel.attributes.uid;

            if (recFollowUser == followPhotoUID) {
              var data = {
                file: pmodel.attributes.file,
                caption: pmodel.attributes.caption,
                username: fName,
                userProfileImage: fImage,
                id: pmodel.id
              }
              var f = new followedPhotoItem({ model: data });
              this.$el.append( f.render().el );
            }
          }, this);
        }, this);

      }
    }, this);
  }
});

var followedPhotoItem = Backbone.View.extend({
  tagName: 'li',
  template: _.template( $('#followed-photos-item').html() ),
  initialize: function() {
    this.render();
  },
  render: function() {
    var html = this.template( this.model );
    this.$el.html( html );
    return this;
  }
});
