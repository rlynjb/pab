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
  initialize: function(options) {
    // we are passing Photos Collection as a initialize param
    this.photos = this.options
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
    // set new photo to new instantiated Photo Model
    var photo = new Photo({
      file: $('#imageUpload')[0].files[0],
      caption: $('#imageCaption').val()
    });
    // create new photo by calling Photos Collection create method
    this.photos.create(photo, { wait: true });
  }
});
