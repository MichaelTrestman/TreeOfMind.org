//= require constants/apted-constants
//= require dispatchers/apted-dispatcher
//= require stores/session-store

var PersonalInformationStore = (function() {
  var _userInfo = {}
  var CHANGE_EVENT = 'change';
  var FAIL_TO_CREATE_EVENT = 'creation-failed';

  return {
    info: function() {
      _userInfo = SessionStore.currentUser;
      _userInfo.password = null;
      return _userInfo
    },
    addChangeEvent: function (callback) {
      $(this).on(CHANGE_EVENT, callback);
    },
    addFailToTakeAction: function(callback) {
      $(this).on(FAIL_TO_CREATE_EVENT, callback);
    },
    triggerChange: function (data) {
      $(this).trigger(CHANGE_EVENT, data);
    },
    triggerFailToTakeAction: function(data) {
      $(this).trigger(FAIL_TO_CREATE_EVENT, data);
    },
    update: function (data) {
      $.ajax({
        url: 'users/' + SessionStore.currentUser.id,
        type: 'PUT',
        data: {user: data}
      })
      .done(function (data) {
        SessionStore.setCurrentUser(data.user);
        this.triggerChange();
      }.bind(this))
      .fail(function (xhr) {
        this.triggerFailToTakeAction([xhr.responseJSON.errors]);
      }.bind(this));
    },
    payload: function (payload) {
      var action = payload.action;
      switch(action.type) {
        case 'UPDATE_PERSONAL':
          this.update(action.data);
          break;
        default:
      }
    }
  }

}());

AptedDispatcher.register(PersonalInformationStore.payload.bind(PersonalInformationStore));
