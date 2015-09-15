var photoComment = Backbone.Model.extend({});

var photoComments = Backbone.Firebase.Collection.extend({
  model: photoComment,
  url: apiUrl + '/comments'
});

var photoPageView = Backbone.View.extend({
  id: 'photo-page',
  template: _.template( $('#photo-page').html() ),
  collection: new photoComments(),
  initialize: function() {
    $('#content').html( this.el );

    this.listenTo(this.model, 'sync', this.render);
  },
  render: function() {
    var html = this.template( this.model.toJSON() );
    this.$el.html( html );

    this.displayComments = new displayPhotoComments({ photoIdUrl: this.model.id });
  },
  events: {
    'click #photo-comment-btn': 'addComment'
  },
  addComment: function(e) {
    e.preventDefault();

    var data = {
      text: $('#photo-comment-text').val(),
      photoID: this.model.id,
      username: qw.attributes.name
    }

    if (data.text == '') {
      console.log('nope nope enter a comment');
    } else {
      this.collection.create(data);
      $('#photo-comment-text').val('');
      this.displayComments.render();
    }
  }
});

var displayPhotoComments = Backbone.View.extend({
  el: '#photo-comments',
  collection: new photoComments(),
  initialize: function(options) {
    this.photoIdUrl = options.photoIdUrl;

    this.listenTo(this.collection, 'sync', this.render);
  },
  render: function() {
    this.collection.each(function(model) {
      var recPhotoID = model.attributes.photoID;

      if (recPhotoID == this.photoIdUrl) {
        var p = new photoCommentItem({ model: model });
        this.$el.append( p.render().el );
      }
    }, this);
  }
});

var photoCommentItem = Backbone.View.extend({
  tagName: 'li',
  template: _.template( $('#photo-comment-item').html() ),
  initialize: function() {
    this.render();
  },
  render: function() {
    var html = this.template( this.model.toJSON() );
    this.$el.html( html );
    return this;
  }
});
