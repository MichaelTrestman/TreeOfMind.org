//= require constants/ToM-constants
//= require dispatchers/ToM-dispatcher

var PublicationsStore = (function(){
  var _publications = [];
  var CHANGE_EVENT = 'change';
  var FAIL_TO_CREATE_EVENT = 'creation-failed';

  return {
    all: function(query){
       if (query==='undefined'){
        query = 'recent'
       }
       $.ajax({
        url: '/publications',
        type: 'GET',
        data: {
          query: query
        }
       })
       .done(function(data){
        _publications = data.publications;
        this.triggerChange();
       }.bind(this))
    },
    publications: function(){
      return _publications;
    },
    new: function(){
      return {
        title: null,
        authorFirstName: null,
        authorLastName: null,
        abstract: null,
        pub_metadata: null
      }
    },
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
    create: function(data){
      $.ajax({
        url: '/publications',
        type: 'POST',
        data: {

        }
      })
    },
    payload: function(payload){
      var action = payload.action;
    }


  }
}());

ToMDispatcher.register(PublicationsStore.payload.bind(PublicationsStore));