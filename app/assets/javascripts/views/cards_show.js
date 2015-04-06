TrelloClone.Views.CardsShow = Backbone.View.extend({
  template: JST['cards/show'],

  events: {
    'click button.card-delete': 'deleteCard'
  },

  deleteCard: function (event) {
    event.preventDefault();
    this.model.destroy();
    this.remove();
  },

  render: function () {
    var renderedContent = this.template({ card: this.model });
    this.$el.html(renderedContent);
    return this;
  }
});
