var userProfilePageView = Backbone.View.extend({
  id: 'user-profile-page',
  template: _.template( $('#user-profile-page').html() ),
  initialize: function() {
    PageMixin.iniPage(this);
  },
  render: function() {
    PageMixin.renderPage(this);
  } 
});
