/*
 * NOTE
 * when i assign Firebase.Model
 * photo collection create doesnt work
 * */
var PhotoP = Backbone.Firebase.Model.extend({
  urlRoot: apiUrl + '/photos'
});

var Photo = Backbone.Model.extend({
  urlRoot: apiUrl + '/photos'
});

var Photos = Backbone.Firebase.Collection.extend({
  model: Photo,
  url: apiUrl + '/photos'
});

var uploadPhotoPageView = Backbone.View.extend({
  id: 'upload-photo-page',
  template: _.template( $('#upload-photo-page').html() ),
  initialize: function() {
    PageMixin.iniPage(this);
  },
  render: function() {
    PageMixin.renderPage(this);

    var g = new displayPhotoView();
    var f = new addPhotoView({ displayPhotosTpl: g });
  }
});

var addPhotoView = Backbone.View.extend({
  el: '#add-photo-form',
  template: _.template( $('#add-photo-form-content').html() ),
  collection: new Photos(),
  initialize: function(options) {
    this.displayPhotos = options.displayPhotosTpl;

    this.render();
  },
  render: function() {
    this.$el.html( this.template );
    return this;
  },
  events: {
    'click #uploadPhoto': 'uploadPhoto'
  },
  uploadPhoto: function(e) {
    // this prevents its default action
    e.preventDefault();

    /*
     * Convert image file to base64 string and post to firebase
     * */
    var rawImg = $('#imageUpload')[0].files[0];
    var reader = new FileReader();
    var tt = this;

    reader.onload = function() {
      var dataURL = reader.result;

      // set new photo to new instantiated Photo Model
      var photo = {
        uid: qw.id,
        file: dataURL,
        caption: $('#imageCaption').val()
      }

      // create new photo by calling Photos Collection create method
      tt.collection.create(photo);

      tt.el.reset();
      tt.displayPhotos.render();
    };
    reader.readAsDataURL(rawImg);
  }
});

var displayPhotoView = Backbone.View.extend({
  el: '#photo-list',
  collection: new Photos(),
  initialize: function(options) {
    this.collection.fetch();
    this.listenTo(this.collection, 'sync', this.render);
  },
  render: function() {
    // there is a rendering issue with views need to refresh
    // only load photos that belongs to current user
    this.collection.each(function(model) {
      var photoUID = model.attributes.uid;
      var currentUID = qw.id;

      if (photoUID === currentUID) {
        var p = new photoItemView({ model: model });
        this.$el.append( p.render().el );
      }
    }, this);
  }
});

var photoItemView = Backbone.View.extend({
  tagName: 'li',
  template: _.template( $('#photo-item').html() ),
  initialize: function() {
    this.render();
  },
  render: function() {
    var html = this.template( this.model.toJSON() );
    this.$el.html( html );
    return this;
  }
});
