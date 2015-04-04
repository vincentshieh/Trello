TrelloClone.Views.ListsNew = Backbone.View.extend({
  template: JST['lists/new'],

  events: {
    'submit form': 'submit'
  },

  render: function () {
    var renderedContent = this.template({ board: this.model });
    this.$el.html(renderedContent);
    return this;
  },

  submit: function (event) {
    var view = this;
    event.preventDefault();

    var params = $(event.currentTarget).serializeJSON();
    var list = new TrelloClone.Models.List(params["list"]);
    list.save({}, {
      success: function () {
        view.model.lists().add(list);
        view.render();
      }
    })
  }
});
