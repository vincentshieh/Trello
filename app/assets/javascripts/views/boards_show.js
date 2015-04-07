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
    var renderedContent = this.template({ board: this.model }),
      listSubviews = this.subviews('.lists');
    this.$el.html(renderedContent);
    this.attachSubviews();

    setTimeout(function () {
      $('.lists').sortable({
        update: function () {
          var newSubviews = [];

          listSubviews.forEach(function (subview) {
            var newIdx = $('.ui-sortable-handle').index(subview.$el);
            newSubviews[newIdx] = subview;
            subview.model.set({ ord: newIdx });
            subview.model.save();
          });

          listSubviews = newSubviews;
        },

        start: function (event, ui) {
          ui.item.addClass('dragged');
        },

        stop: function (event, ui) {
          ui.item.removeClass('dragged');
        }
      });
    }, 0);

    return this;
  }
});
