TrelloClone.Views.BoardsNew = Backbone.View.extend({
  template: JST['boards/new'],

  events: {
    'submit form': 'submit'
  },

  render: function () {
    var renderedContent = this.template({ board: this.model });
    this.$el.html(renderedContent);
    return this;
  },

  submit: function (event) {
    event.preventDefault();

    var params = $(event.currentTarget).serializeJSON();
    var newBoard = new TrelloClone.Models.Board(params["board"]);

    newBoard.save({}, {
      success: function () {
        TrelloClone.Collections.boards.add(newBoard);
        Backbone.history.navigate('', { trigger: true });
      }
    })
  }
});
