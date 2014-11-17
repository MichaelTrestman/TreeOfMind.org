//= require constants/ToM-constants
//= require dispatchers/ToM-dispatcher

var SessionStore = (function () {
  var CHANGE_EVENT = 'change';
  var FAIL_TO_CREATE_EVENT = 'creation-failed';
  return {
    currentUser: {},
    isAdmin: function() {
      return this.currentUser.type === 'Admin';
    },
    setCurrentUser: function(user) {
      if(typeof user === 'string'){
        user = JSON.parse(user);
        this.currentUser = user
        Object.freeze(this.currentUser);
      } else {
        this.currentUser = null
      }
    },
    getAuthenticityToken: function() {
      var csrfToken = $('meta[name="csrf-token"]')[0];
      if(csrfToken) return csrfToken.content;
    },
    new: function () {
      return {
        email: null,
        password: null
      };
    },
    create: function(data) {
      $.ajax({
        url: '/sessions',
        type: 'POST',
        data: data
      })
      .done(function (data) {
        var type = Object.keys(data)[0];
        _currentUser = {type: type, data: data[type]};
        window.location = data.redirect;
        this.triggerChange();
      }.bind(this))
      .fail(function (xhr) {
        this.triggerFailToTakeAction([xhr.responseJSON.errors]);
      }.bind(this));
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
    payload: function (payload) {
      var action = payload.action;
      switch(action.type) {
        case ToMConstants.CREATE_SESSION:
          this.create(action.data);
          break;
        default:
      }
    }
  }
}());
ToMDispatcher.register(SessionStore.payload.bind(SessionStore));
