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
    newPublication: function(){
      return{
        title: null,
        abstract: null
      }
    },

    all: function(query){
       if (
            !query
          )            {
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
      return _active_pub._topics
    },
    authors: function(){
      return _active_pub.authors
    },
    noPub: function(){
      _active_pub = {};
      this.triggerChange();
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
        this.triggerChange();
      }.bind(this))
    },
    create: function(data){
      console.log('firing create ajax')
      $.ajax({
        url: '/publications',
        type: 'POST',
        data: {pub: data}
      })
      .done(function(data){
        console.log(data)
        this.display(data.id);
        window.location.href='#inspect_publication'
      }.bind(this))
    },
    update: function(data){
      console.log('firing update ajax')
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
      .fail(console.log('shit updating failed'))
    },
    destroy: function(id){
      $.ajax({
        url: '/publications/' + id,
        type: 'DELETE',
        data: {id: id}
      })
      .done(function(data){
        console.log(data)
        _publications.forEach(function(pub, i){
          if (pub.id===id) {
            console.log('splicing that shit mang')
            _publications.splice(i, 1)
          };
        })
        this.triggerChange();
      }.bind(this))
      .fail( function(){console.log('shit deletion failed')})

    },
    payload: function(payload){
      var action = payload.action;
      switch(action.type){
        case ToMConstants.DISPLAY_PUBLICATION:
          this.display(action.id);
          break;
        case ToMConstants.UPDATE_PUBLICATION:
          this.update(action.data);
          break;
        case ToMConstants.CREATE_PUBLICATION:
          this.create(action.data);
          break;
        case ToMConstants.DESTROY_PUBLICATION:
          this.destroy(action.id);
          break;
        default:
      }
    }


  }
}());

ToMDispatcher.register(PublicationsStore.payload.bind(PublicationsStore));