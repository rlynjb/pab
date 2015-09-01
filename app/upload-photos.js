var Photo = Backbone.Model.extend({
  urlRoot: apiUrl + '/photos.json'
});

var Photos = Backbone.Collection.extend({
  model: Photo
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
    var reader = new FileReader();
    reader.onload = function() {
      var dataURL = reader.result;
      console.log(dataURL);
    };
    reader.readAsDataURL($('#imageUpload')[0].files[0]);

    // set new photo to new instantiated Photo Model
    var photo = new Photo({
      file: $('#imageUpload')[0].files[0],
      caption: $('#imageCaption').val()
    });

    // create new photo by calling Photos Collection create method
    //this.photos.create(photo, { wait: true });

    // clears the form
    this.el.reset();
  }
});
