//= require constants/apted-constants
//= require dispatchers/apted-dispatcher

var UserStore = (function () {
  var _users = [];
  var CHANGE_EVENT = 'change';
  var FAIL_TO_CREATE_EVENT = 'creation-failed';

  return {
    types: [{value: "Program", show: "Program"}, {value: "IndividualProvider", show: "IndividualProvider"}],
    all: function() {
      $.ajax({
        url: '/users',
        type: 'GET'
      })
      .done(function (data) {
        _users = data.users;
        this.triggerChange();
      }.bind(this))
    },
    users: function() {
      return _users;
    },
    new: function () {
      return {
        id: null,
        email: null,
        password: null,
        type: this.types[0]
      };
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
    create: function(data) {
      $.ajax({
        url: '/users',
        type: 'POST',
        data: { user: data }
      })
      .done(function (data) {
        window.location = data.redirect;
      }.bind(this))
      .fail(function (xhr) {
        this.triggerFailToTakeAction([xhr.responseJSON.errors]);
      }.bind(this));
    },

    update: function (data) {
      $.ajax({
        url: '/users/' + data.id,
        type: 'PUT',
        data: {user: data}
      })
      .done(function (data) {
        _users.forEach(function (addr, i) {
          if (addr.id === data.user.id) {
            _users[i] = data.user;
            return this.triggerChange();
          }
        }.bind(this))
      }.bind(this))
      .fail(function (xhr) {
        this.triggerFailToTakeAction([xhr.responseJSON.errors]);
      }.bind(this));
    },

    delete: function (id) {
      $.ajax({
        type: 'DELETE',
        url: '/users/' + id
      })
      .done(function (data) {
        _users.forEach(function (addr, i) {
          if (addr.id === id) {
            _users.splice(i, 1)[0];
            return this.triggerChange();
          }
        }.bind(this));
      }.bind(this))
      .fail(function (xhr) {
        this.triggerFailToTakeAction([xhr.responseJSON.errors]);
      }.bind(this));
    },

    payload: function (payload) {
      var action = payload.action;
      switch(action.type) {
        case AptedConstants.CREATE_USER:
          this.create(action.data);
          break;
        case AptedConstants.UPDATE_USER:
          this.update(action.data);
          break;
        case AptedConstants.DESTROY_USER:
          this.delete(action.id);
          break;
        default:
      }
    }
  }
}());

AptedDispatcher.register(UserStore.payload.bind(UserStore));
