var Photo = Backbone.Model.extend({
  urlRoot: apiUrl + '/photos.json'
});

var Photos = Backbone.Firebase.Collection.extend({
  model: Photo,
  firebase: apiUrl + '/photos.json'
});

var uploadPhotoPageView = Backbone.View.extend({
  id: 'upload-photo-page',
  template: _.template( $('#upload-photo-page').html() ),
  initialize: function() {
    PageMixin.iniPage(this);
  },
  render: function() {
    PageMixin.renderPage(this);

    var f = new addPhotoView();
    var g = new displayPhotoView({ photos: new Photos() });
  }
});

var addPhotoView = Backbone.View.extend({
  el: '#add-photo-form',
  template: _.template( $('#add-photo-form-content').html() ),
  initialize: function() {
    // we are passing Photos Collection as a initialize param
    // rather then instantiating new Photos Collection object
    /*
     * Didnt take this approach, instantiated it instead.
     * I'm still abit confuse on how this approach works or will benefit
     * */
    this.photos = new Photos();;
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
      var photo = new Photo({
        file: dataURL,
        caption: $('#imageCaption').val()
      });

      // create new photo by calling Photos Collection create method
      tt.photos.create(photo, { wait: true });

      // clears the form
      tt.el.reset();
    };
    reader.readAsDataURL(rawImg);
  }
});

var displayPhotoView = Backbone.View.extend({
  el: '#photo-list',
  initialize: function(options) {
    this.photos = options.photos;

    this.photos.fetch();
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
    console.log(this.photos);
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
