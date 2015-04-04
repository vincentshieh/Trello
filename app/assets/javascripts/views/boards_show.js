TrelloClone.Views.BoardsShow = Backbone.CompositeView.extend({
  template: JST['boards/show'],

  events: {
    'click button.delete': 'deleteBoard'
  },

  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
    this.listenTo(this.model.lists(), 'add', this.addList);

    var listNewView = new TrelloClone.Views.ListsNew({
      model: this.model
    });
    this.addSubview('.lists-new', listNewView);

    this.model.lists().each(this.addList.bind(this));
  },

  addList: function (list) {
    var listsShow = new TrelloClone.Views.ListsShow({ model: list });
    this.addSubview('.lists', listsShow);
  },

  deleteBoard: function (event) {
    event.preventDefault();
    this.model.destroy({
      success: function () {
        Backbone.history.navigate('', { trigger: true });
      }
    });
  },

  render: function () {
    var renderedContent = this.template({ board: this.model });
    this.$el.html(renderedContent);
    this.attachSubviews();
    return this;
  }
});
