var photoPageView = Backbone.View.extend({
  id: 'photo-page',
  template: _.template( $('#photo-page').html() ),
  initialize: function() {
    PageMixin.iniPage(this);
  },
  render: function() {
    console.log(this.model);
    this.$el.html( this.template );
  }  
});
