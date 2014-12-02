//= require constants/ToM-constants
//= require dispatchers/ToM-dispatcher

var AuthorsStore = (function(){
  var _authors = [];
  var _active_author = {};
  _active_author.publications = [];
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

    all: function(query){
      if (query==='undefined'){
        query = 'recent'
      }
      $.ajax({
        url: '/authors',
        type: 'GET',
        data: {
          query: query
        }
      })
      .done(function(data){
        _authors = data.authors;
      })
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

      }
    }


  }

}());

ToMDispatcher.register(AuthorsStore.payload.bind(AuthorsStore));

