var fire = new Firebase('https://pab.firebaseio.com');

var PageMixin = {
  iniPage: function(e) {
    $('#content').html( e.el );
    e.render(); 
  },
  renderPage: function(e) {
    e.$el.html( e.template );
  }
};

var indexPageView = Backbone.View.extend({
  id: 'index-page',
  template: _.template( $('#index-page').html() ),
  initialize: function() {
    PageMixin.iniPage(this);
  },
  render: function() {
    PageMixin.renderPage(this);
  }
});

var aboutPageView = Backbone.View.extend({
  id: 'about-page',
  template: _.template( $('#about-page').html() ),
  initialize: function() {
    PageMixin.iniPage(this);
  },
  render: function() {
    PageMixin.renderPage(this);
  }
});
