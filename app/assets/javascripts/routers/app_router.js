TrelloClone.Routers.AppRouter = Backbone.Router.extend({
  routes: {
    '': 'boardsIndex',
    'boards/new': 'boardsNew',
    'boards/:id': 'boardsShow'
  },

  boardsIndex: function () {
    var boards = TrelloClone.Collections.boards;
    boards.fetch();

    var indexView = new TrelloClone.Views.BoardsIndex({
      collection: boards
    });

    this._swapView(indexView);
  },

  boardsNew: function () {
    var newView = new TrelloClone.Views.BoardsNew();
    this._swapView(newView);
  },

  boardsShow: function (id) {
    var board = TrelloClone.Collections.boards.getOrFetch(id);

    var showView = new TrelloClone.Views.BoardsShow({
      model: board
    });

    this._swapView(showView);
  },

  _swapView: function (newView) {
    this.currentView && this.currentView.remove();
    $('#main').html(newView.render().$el);
    this.currentView = newView;
  }
});
