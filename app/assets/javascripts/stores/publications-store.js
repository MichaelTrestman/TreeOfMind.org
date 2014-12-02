//= require constants/ToM-constants
//= require dispatchers/ToM-dispatcher

var PublicationsStore = (function(){
  var _publications = [];
  var _active_pub = {};
  _active_pub.topics = [];
  _active_pub.distribution = null;
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
    activePub: function(){
      return _active_pub;
    },

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
    topics: function(){
      console.log(_active_pub.topics)
      return _active_pub._topics
    },
    authors: function(){
      console.log(_active_pub.authors)
      return _active_pub.authors
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

    create: function(data){
      $.ajax({
        url: '/publications',
        type: 'POST',
        data: {

        }
      })
    },
    display: function(id){
      _publications.forEach(function(pub){
        if(id===pub.id){
          _active_pub = pub
        }
      });
      $.ajax({
        url: '/publications/' + id,
        type: 'GET',
        data: {id: id}
      })
      .done(function(data){
        _active_pub = data
        console.log(data)
        // _active_pub.topics = data.topics;
        this.triggerChange();

      }.bind(this))

    },
    update: function(data){
      $.ajax({
        url: '/publications/' + data.id,
        type: 'PUT',
        data: {pub: data}
      })
      .done(function(data){

        _active_pub = data
        _publications.forEach(function(pub, i){
          if (pub.id === data.id) {
            _publications[i] = data;
          };
          return this.triggerChange();
        }.bind(this))
      }.bind(this))
    },
    payload: function(payload){
      var action = payload.action;
      switch(action.type){
        case ToMConstants.DISPLAY_PUB:
          this.display(action.id);
          break;
        case ToMConstants.UPDATE_PUBLICATION:
          this.update(action.data);
          break;
      }
    }


  }
}());

ToMDispatcher.register(PublicationsStore.payload.bind(PublicationsStore));