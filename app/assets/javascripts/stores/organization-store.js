//= require constants/apted-constants
//= require dispatchers/apted-dispatcher

var OrganizationStore = (function () {
  var _organizations = [];
  var CHANGE_EVENT = 'change';
  var FAIL_TO_CREATE_EVENT = 'creation-failed';

  return {
    all: function() {
      $.ajax({
        url: '/admin/organizations',
        type: 'GET'
      })
      .done(function (data) {
        _organizations = data.organizations;
        this.triggerChange();
      }.bind(this))
    },
    organizations: function() {
      return _organizations;
    },
    new: function () {
      return {
        name: null
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
        url: '/admin/organizations',
        type: 'POST',
        data: { organization: data }
      })
      .done(function (data) {
        _organizations.push(data.organization);
        this.triggerChange();
      }.bind(this))
      .fail(function (xhr) {
        this.triggerFailToTakeAction([xhr.responseJSON.errors]);
      }.bind(this));
    },

    update: function (data) {
      $.ajax({
        url: '/admin/organizations/' + data.id,
        type: 'PUT',
        data: {organization: data}
      })
      .done(function (data) {
        return this.triggerChange(data.organization);
      }.bind(this))
      .fail(function (xhr) {
        this.triggerFailToTakeAction([xhr.responseJSON.errors]);
      }.bind(this));
    },

    delete: function (id) {
      $.ajax({
        type: 'DELETE',
        url: '/admin/organizations/' + id
      })
      .done(function (data) {
        _organizations.forEach(function (org, i) {
          if (org.id === id) {
            _organizations.splice(i, 1)[0];
            return this.triggerChange();
          }
        }.bind(this));
      }.bind(this))
      .fail(function (xhr) {
        this.triggerFailToTakeAction([xhr.responseJSON.errors]);
      }.bind(this));
    },
    show: function (id) {
      $.ajax({
        type: 'GET',
        url: '/organizations/' + id
      })
      .done(function (data){
        this.triggerChange(data.organization)
      }.bind(this))
    },
    payload: function (payload) {
      var action = payload.action;
      switch(action.type) {
        case AptedConstants.CREATE_ORGANIZATION:
          this.create(action.data);
          break;
        case AptedConstants.UPDATE_ORGANIZATION:
          this.update(action.data);
          break;
        case AptedConstants.DESTROY_ORGANIZATION:
          this.delete(action.id);
          break;
        default:
      }
    }
  }
}());

AptedDispatcher.register(OrganizationStore.payload.bind(OrganizationStore));
