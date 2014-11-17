//= require constants/apted-constants
//= require dispatchers/apted-dispatcher

var TagStore = (function (){
  var _tags = [];
  var CHANGE_EVENT = 'change';
  var FAIL_TO_CREATE_EVENT = 'creation-failed';

  return {
    all: function(taggable_type, taggable_id){
      $.ajax({
        url: '/member/tags',
        type: 'GET',
        data: {tag: {taggable_type: taggable_type, taggable_id: taggable_id}}
      })
      .done(function (data) {
        _tags = data.tags;
        this.triggerChange();
      }.bind(this))
    },
    tags: function() {
      return _tags;
    },
    new: function(){
      return {
        name: null
      }
    },
    create: function(data){
      $.ajax({
        url: '/member/tags',
        type: 'POST',
        data: {tag: data}
      })
      .done(function (data) {
        console.log(data)
        data.tags.forEach(function (tg, i){
          _tags.unshift(tg);
        })
        this.triggerChange();
      }.bind(this))
    },

    delete: function (id) {
      $.ajax({
        type: 'DELETE',
        url: '/member/tags/' + id
      })
      .done(function (data) {
        _tags.forEach(function (tag, i) {
          if (tag.id === id) {
            _tags.splice(i, 1)[0];
            return this.triggerChange();
          }
        }.bind(this));
      }.bind(this))
      .fail(function (xhr) {
        this.triggerFailToTakeAction([xhr.responseJSON.errors]);
      }.bind(this));
    },

    addChangeEvent: function (callback) {
      $(this).on(CHANGE_EVENT, callback);
    },
    addFailToTakeAction: function (callback) {
      $(this).on(FAIL_TO_CREATE_EVENT, callback);
    },
    triggerChange: function (data) {
      $(this).trigger(CHANGE_EVENT, data);
    },
    addFailToTakeAction: function(callback) {
      $(this).on(FAIL_TO_CREATE_EVENT, callback);
    },
    triggerFailToTakeAction: function(data) {
      $(this).trigger(FAIL_TO_CREATE_EVENT, data);
    },
    payload: function(payload){
      var action = payload.action;
      switch(action.type) {
        case AptedConstants.CREATE_TAG:
          this.create(action.data);
          break;
        case AptedConstants.DESTROY_TAG:
          this.delete(action.id);
          break;
        default:
      }
    }
  }
}());
AptedDispatcher.register(TagStore.payload.bind(TagStore));
