//= require constants/ToM-constants
//= require dispatchers/ToM-dispatcher

var AuthorsStore = (function(){
  var _authors = [];
  var _active_author = {};
  var _active_author_pubs = [];
  var CHANGE_EVENT = 'change';
  var FAIL_TO_CREATE_EVENT = 'creation-failed';

  return {
    addChangeEvent: function(callback){
      $(this).on(CHANGE_EVENT, callback);
    },
    addFailToTakeAction: function(callback){
      $(this).on(FAIL_TO_CREATE_EVENT, callback);
    },
    triggerChange: function (data) {
      $(this).trigger(CHANGE_EVENT, data);
    },
    triggerFailToTakeAction: function(data) {
      $(this).trigger(FAIL_TO_CREATE_EVENT, data);
    },
    activeAuthor: function(){
      return _active_author;
    },
    activeAuthorPubs: function(){
      return _active_author_pubs;
    },
    authors: function(){
      return _authors;
    },

    all: function(query){
      if (!query){
        query = 'recent'
      }
      $.ajax({
        url: '/researchers',
        type: 'GET',
        data: {
          query: query
        }
      })
      .done(function(data){
        _authors = data.researchers;
        this.triggerChange();
      }.bind(this))
    },

    display: function(id){
      _authors.forEach(function(author){
          if(id===author.id){
            _active_author = author
          }
      });
      $.ajax({
        url: '/researchers/' + id,
        type: 'GET',
        data: {id: id}
      })
      .done(function(data){
        _active_author = data.researcher;
        _active_author_pubs = data.publications;
        this.triggerChange();
      }.bind(this))
    },

    payload: function(payload){
      var action = payload.action;
      switch(action.type){
        case ToMConstants.DISPLAY_AUTHOR:
          this.display(action.id);
          break;
        case ToMConstants.UPDATE_AUTHOR:
          this.update(action.data);
          break;
        case ToMConstants.DESTROY_AUTHOR:
          this.destroy(action.id);
          break;
        default:
      }
    }


  }

}());

ToMDispatcher.register(AuthorsStore.payload.bind(AuthorsStore));

