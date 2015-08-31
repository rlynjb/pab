/*
 * we are coding a complex Backbone Model
 * this is the model class's code
 * */
var Photo = Backbone.Model.extend({
  urlRoot: '/photos',
  /*
   * NOTE:
   * all models & collections uses Backbone.sync method
   * sync is the method thats called everytime were
   * reading or writing one or more models to or from the server
   * - Backbone doesnt support AJAX file uploads, that is why
   *   we have to overwrite sync function in model level only
   * - This is the method that is used for reading, updating, 
   *   and deleting this model's instance.
   * - It takes in 3 parameters
   *   1st, CRUD method (create, read, update, delete)
   *   2nd, model instance
   *   3rd, options object
   * */
  sync: function(method, model, options) {
    /*
     * TODO:
     * play around with this sync function
     * we need options
     * this is where we convert image file to data url
     * https://github.com/firebase/firepano
     * */
    console.log('1st param', method);
    console.log('2nd param', model);
    console.log('3rd param', options);
  }
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
  initialize: function(options) {
    // we are passing Photos Collection as a initialize param
    // rather then instantiating new Photos Collection object
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
    /*
     * TODO
     * find a way to console log Model sync method
     * */
    console.log(photo);
    // create new photo by calling Photos Collection create method
    // TODO uncomment when ready
    this.photos.create(photo, { wait: true });

    // clears the form
    //this.el.reset();
  }
});
