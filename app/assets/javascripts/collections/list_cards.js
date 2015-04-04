TrelloClone.Collections.ListCards = Backbone.Collection.extend({
  model: TrelloClone.Models.Card,

  url: function () {
    this.list.url() + '/cards';
  },

  comparator: function (card) {
    return card.get('ord');
  },

  initialize: function (model, options) {
    this.list = options.list;
  }
});
