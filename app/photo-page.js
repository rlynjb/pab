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
    this.model.fetch();
    this.listenTo(this.model, 'sync', this.render);
  },
  render: function() {
    this.$el.html( this.template( this.model.attributes ) );

    var h = new displayPhotoComments({ comments: new photoComments() });
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

    this.collection.create(data);
    $('#photo-comment-text').val('');
  }
});

var displayPhotoComments = Backbone.View.extend({
  el: '#photo-comments',
  initialize: function(options) {
    this.comments = options.comments;
    this.listenTo(this.comments, 'sync', this.render);
  },
  render: function() {
    this.comments.each(function(model) {
      var p = new photoCommentItem({ model: model });
      this.$el.append( p.render().el );
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
