TrelloClone.Views.ListsShow = Backbone.CompositeView.extend({
  template: JST['lists/show'],

  events: {
    "click button.list-delete": "deleteList"
  },

  initialize: function () {
    this.listenTo(this.model.cards(), 'add', this.addCard);

    var cardNewView = new TrelloClone.Views.CardsNew({
      model: this.model
    });
    this.addSubview('.cards-new', cardNewView);

    this.model.cards().each(this.addCard.bind(this));
  },

  addCard: function (card) {
    var cardsShow = new TrelloClone.Views.CardsShow({ model: card });
    this.addSubview('.cards', cardsShow);
  },

  deleteList: function (event) {
    event.preventDefault();
    this.model.destroy();
  },

  render: function () {
    var renderedContent = this.template({ list: this.model }),
      cardSubviews = this.subviews('.cards'),
      view = this;
    this.$el.html(renderedContent);
    this.attachSubviews();

    setTimeout(function () {
      view.$('.cards').sortable({
        update: function () {
          var newSubviews = [];

          cardSubviews.forEach(function (subview) {
            var newIdx = view.$('.cards > div').index(subview.$el);
            newSubviews[newIdx] = subview;
            subview.model.set({ ord: newIdx });
            subview.model.save();
          });

          cardSubviews = newSubviews;
        }
      });
    }, 0);

    return this;
  }
});
