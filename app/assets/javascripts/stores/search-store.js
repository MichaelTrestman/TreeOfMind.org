//= require constants/apted-constants
//= require dispatchers/apted-dispatcher

var SearchStore = (function () {
  var _results = [];
  var _query = "";
  var CHANGE_RESULTS = 'change';
  return {
    results: function(){
      return _results
    },
    search: function(data){
      $.ajax({
        url: '/search',
        type: 'POST',
        data: data
      }).done(function(data){
        _results = data
        this.triggerChange();
      }.bind(this))
    },
    addChangeEvent: function (callback) {
      $(this).on(CHANGE_RESULTS, callback);
    },
    triggerChange: function (data) {
      $(this).trigger(CHANGE_RESULTS, data);
    },
    payload: function (payload) {
      var action = payload.action;
      switch(action.type) {
        case AptedConstants.UPDATE_SEARCH_RESULTS:
          this.search(action.data);
          break;
        default:
      }
    }
  }
}());

AptedDispatcher.register(SearchStore.payload.bind(PageStore));
