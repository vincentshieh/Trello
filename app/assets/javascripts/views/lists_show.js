TrelloClone.Views.ListsShow = Backbone.View.extend({
  template: JST['lists/show'],

  events: {
    "click button.delete": "deleteList"
  },

  deleteList: function (event) {
    event.preventDefault();
    this.model.destroy();
  },

  render: function () {
    var renderedContent = this.template({ list: this.model });
    this.$el.html(renderedContent);
    return this;
  }
});
