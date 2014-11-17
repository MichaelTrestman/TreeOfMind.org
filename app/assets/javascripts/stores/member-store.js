//= require constants/apted-constants
//= require dispatchers/apted-dispatcher

var MemeberStore = (function () {
  var _members = [];
  var CHANGE_EVENT = 'change';
  var FAIL_TO_CREATE_EVENT = 'creation-failed';
  return {
    all: function(type) {
      $.ajax({
        url: '/admin/members',
        type: 'GET',
        data: { type: type }
      })
      .done(function (data) {
        _members = data.members;
        this.triggerChange();
      }.bind(this))
    },
    members: function() {
      return _members;
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
    triggerFailToTakeAction: function(data) {
      $(this).trigger(FAIL_TO_CREATE_EVENT, data);
    },
    payload: function (payload) {
      var action = payload.action;
      switch(action.type) {
        case AptedConstants.CREATE_MEMBER:
          this.create(action.data);
          break;
        default:
      }
    }
  }
}());

AptedDispatcher.register(MemeberStore.payload.bind(MemeberStore));
