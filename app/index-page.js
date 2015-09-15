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

      if (currentUser == recCurrentUser) {
        this.photos.each(function(pmodel) {
          var followPhotoUID = pmodel.attributes.uid;

          if (recFollowUser == followPhotoUID) {
            //console.log('photo', pmodel);
            var f = new followedPhotoItem({ model: pmodel });
            this.$el.append( f.render().el );
          }
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
    var html = this.template( this.model.toJSON() );
    this.$el.html( html );
    return this;
  }
});
