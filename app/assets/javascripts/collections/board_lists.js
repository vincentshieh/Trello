TrelloClone.Collections.BoardLists = Backbone.Collection.extend({
  model: TrelloClone.Models.List,

  url: function () {
    return this.board.url() + '/lists';
  },

  comparator: function (list) {
    return list.get('ord');
  },

  initialize: function (models, options) {
    this.board = options.board;
  }
})
