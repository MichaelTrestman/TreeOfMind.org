//= require constants/apted-constants
//= require dispatchers/apted-dispatcher

var GroupStore = (function () {
  var _groups = [];
  var CHANGE_EVENT = 'change';
  var FAIL_TO_CREATE_EVENT = 'creation-failed';

  return {
    all: function(type, id) {
      $.ajax({
        url: '/admin/groups',
        type: 'GET'
      })
      .done(function (data) {
        _groups = data.groups;
        this.triggerChange();
      }.bind(this))
    },
    groups: function() {
      return _groups;
    },
    show: function(id) {
      $.ajax({
        url: '/groups/' + id,
        type: 'GET'
      })
      .done(function (data) {
        this.triggerChange(data.group);
      }.bind(this))
    },
    new: function () {
      return {
        id: null,
        name: null,
        kind: null,
        description: null,
        cost: 0,
        join_details: null
      };
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
    create: function(data) {
      $.ajax({
        url: '/admin/groups',
        type: 'POST',
        data: { group: data }
      })
      .done(function (data) {
        _groups.push(data.group);
        this.triggerChange();
      }.bind(this))
      .fail(function (xhr) {
        this.triggerFailToTakeAction([xhr.responseJSON.errors]);
      }.bind(this));
    },

    update: function (data) {
      $.ajax({
        url: '/admin/groups/' + data.id,
        type: 'PUT',
        data: {group: data}
      })
      .done(function (data) {
        this.triggerChange(data.group);
      }.bind(this))
      .fail(function (xhr) {
        this.triggerFailToTakeAction([xhr.responseJSON.errors]);
      }.bind(this));
    },

    delete: function (id) {
      $.ajax({
        type: 'DELETE',
        url: '/admin/groups/' + id
      })
      .done(function (data) {
        _groups.forEach(function (gro, i) {
          if (gro.id === id) {
            _groups.splice(i, 1)[0];
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
        case AptedConstants.CREATE_GROUP:
          this.create(action.data);
          break;
        case AptedConstants.UPDATE_GROUP:
          this.update(action.data);
          break;
        case AptedConstants.DESTROY_GROUP:
          this.delete(action.id);
          break;
        default:
      }
    }
  }
}());

AptedDispatcher.register(GroupStore.payload.bind(GroupStore));
