//= require constants/apted-constants
//= require dispatchers/apted-dispatcher

var LicenseStore = (function () {
  var _licenses = [];
  var CHANGE_EVENT = 'change';
  var FAIL_TO_CREATE_EVENT = 'creation-failed';

  return {
    all: function(){
      $.ajax({
        url: '/member/licenses',
        type: 'GET'
      })
      .done(function(data){
        _licenses = data.licenses;
        this.triggerChange();
      }.bind(this))
    },

    licenses: function() {
      return _licenses;
    },

    new: function () {
      return {
        id: null,
        license_number: null,
        kind: null
      }
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
        url: '/member/licenses',
        type: 'POST',
        data: {license: data}
      })
      .done(function(response) {
        _licenses.push(response.license);
        this.triggerChange();
      }.bind(this))
      .fail(function (xhr) {
        console.log(xhr.responseJSON.errors)
        this.triggerFailToTakeAction([xhr.responseJSON.errors]);
      }.bind(this));
    },

    update: function(data) {
      $.ajax({
        url: '/member/licenses/' + data.id,
        type: 'PUT',
        data: {license: data}
      })
      .done(function (data) {
        var updatedLicense = data.license;
        _licenses.forEach(function (lic, i) {
          if (lic.id === updatedLicense.id) {
            _licenses[i] = updatedLicense;
            return this.triggerChange();
          }
        }.bind(this))
      }.bind(this))
      .fail(function (xhr) {
        this.triggerFailToTakeAction([xhr.responseJSON.errors]);
      }.bind(this));
    },

    delete: function(id) {
      $.ajax({
        type: 'DELETE',
        url: '/member/licenses/' + id
      })
      .done(function (data) {
        _licenses.forEach(function (lic, i) {
          if (lic.id === id) {
            _licenses.splice(i, 1)[0];
            return this.triggerChange();
          }
        }.bind(this));
      }.bind(this))
      .fail(function (xhr) {
        this.triggerFailToTakeAction([xhr.responseJSON.errors]);
      }.bind(this));
    },

    payload: function(payload) {
      var action = payload.action
      switch(action.type) {
        case AptedConstants.CREATE_LICENSE:
          this.create(action.data);
          break;
        case AptedConstants.UPDATE_LICENSE:
          this.update(action.data);
          break;
        case AptedConstants.DESTROY_LICENSE:
          this.delete(action.id);
          break;
        default:
      }
    }
  };
}());

AptedDispatcher.register(LicenseStore.payload.bind(LicenseStore));
