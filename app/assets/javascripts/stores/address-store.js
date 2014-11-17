//= require constants/apted-constants
//= require dispatchers/apted-dispatcher

var AddressStore = (function () {
  var _addresses = [];
  var CHANGE_EVENT = 'change';
  var FAIL_TO_CREATE_EVENT = 'creation-failed';

  return {
    all: function(type, id) {
      $.ajax({
        url: '/member/addresses',
        type: 'GET',
        data: { address: {addressable_type: type, addressable_id: id} }
      })
      .done(function (data) {
        _addresses = data.addresses;
        this.triggerChange();
      }.bind(this))
    },
    addresses: function() {
      return _addresses;
    },
    new: function () {
      return {
        id: null,
        street_1: null,
        street_2: null,
        city: null,
        state: null,
        zip: null
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
        url: '/member/addresses',
        type: 'POST',
        data: { address: data }
      })
      .done(function (data) {
        _addresses.push(data.address);
        this.triggerChange();
      }.bind(this))
      .fail(function (xhr) {
        this.triggerFailToTakeAction([xhr.responseJSON.errors]);
      }.bind(this));
    },

    update: function (data) {
      $.ajax({
        url: '/member/addresses/' + data.id,
        type: 'PUT',
        data: {address: data}
      })
      .done(function (data) {
        _addresses.forEach(function (addr, i) {
          if (addr.id === data.address.id) {
            _addresses[i] = data.address;
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
        url: '/member/addresses/' + id
      })
      .done(function (data) {
        _addresses.forEach(function (addr, i) {
          if (addr.id === id) {
            _addresses.splice(i, 1)[0];
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
        case AptedConstants.CREATE_ADDRESS:
          this.create(action.data);
          break;
        case AptedConstants.UPDATE_ADDRESS:
          this.update(action.data);
          break;
        case AptedConstants.DESTROY_ADDRESS:
          this.delete(action.id);
          break;
        default:
      }
    }
  }
}());

AptedDispatcher.register(AddressStore.payload.bind(AddressStore));
