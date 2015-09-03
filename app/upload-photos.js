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

    var g = new displayPhotoView({ photos: new Photos() });
    var f = new addPhotoView({ tpl: g, photos: new Photos() });
  }
});

var addPhotoView = Backbone.View.extend({
  el: '#add-photo-form',
  template: _.template( $('#add-photo-form-content').html() ),
  initialize: function(options) {
    this.photos = options.photos;
    this.tpl = options.tpl;
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
        file: dataURL,
        caption: $('#imageCaption').val()
      };

      // create new photo by calling Photos Collection create method
      tt.photos.create(photo);

      // clears the form
      tt.el.reset();
      tt.tpl.render();
    };
    reader.readAsDataURL(rawImg);
  }
});

var displayPhotoView = Backbone.View.extend({
  el: '#photo-list',
  initialize: function(options) {
    this.photos = options.photos;

    /*
     * NOTE:
     * using Backbonefire, we dont need to do fetch
     * */
    //this.photos.fetch();
    this.listenTo(this.photos, 'sync', this.render);
  },
  render: function() {
    /*
     * TODO
     * might need to code custom ajax in Collection
     * coz Model ID is undefined due to Firebase'
     * item ID convention, it is not by index but by
     * random generated unique id
     * */
    this.photos.each(function(model) {
      var p = new photoItemView({ model: model });
      this.$el.append( p.render().el );
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
