var photoPageView = Backbone.View.extend({
  id: 'photo-page',
  template: _.template( $('#photo-page').html() ),
  initialize: function() {
    $('#content').html( this.el );
    this.model.fetch();
    this.listenTo(this.model, 'sync', this.render);
  },
  render: function() {
    this.$el.html( this.template( this.model.attributes ) );
  }  
});
