//= require constants/apted-constants
//= require dispatchers/apted-dispatcher

var PhoneStore = (function (){
  var _phones = [];
  var CHANGE_EVENT = 'change';
  var FAIL_TO_CREATE_EVENT = 'creation-failed';

  return {
    all: function(phoneable_type, phoneable_id){
      $.ajax({
        url: '/member/phones',
        type: 'GET',
        data: {phone: {phoneable_type: phoneable_type, phoneable_id: phoneable_id}}
      })
      .done(function (data) {
        _phones = data.phones;
        this.triggerChange();
      }.bind(this))
    },
    phones: function() {
      return _phones;
    },
    new: function(){
      return {
        phone_number: null,
        kind: null
      }
    },
    create: function(data){
      $.ajax({
        url: '/member/phones',
        type: 'POST',
        data: {phone: data}
      })
      .done(function (data) {
        _phones.unshift(data.phone);
        this.triggerChange();
      }.bind(this))
      .fail(function (xhr) {
        this.triggerFailToTakeAction([xhr.responseJSON.errors]);
      }.bind(this));
    },

    update: function (data) {
      $.ajax({
        url: '/member/phones/' + data.id,
        type: 'PUT',
        data: {phone: data}
      })
      .done(function (data) {
        _phones.forEach(function (pho, i) {
          if (pho.id === data.phone.id) {
            _phones[i] = data.phone;
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
        url: '/member/phones/' + id
      })
      .done(function (data) {
        _phones.forEach(function (pho, i) {
          if (pho.id === id) {
            _phones.splice(i, 1)[0];
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
        case AptedConstants.CREATE_PHONE:
          this.create(action.data);
          break;
        case AptedConstants.UPDATE_PHONE:
          this.update(action.data);
          break;
        case AptedConstants.DESTROY_PHONE:
          this.delete(action.id);
          break;
        default:
      }

    }
  }
}());

AptedDispatcher.register(PhoneStore.payload.bind(PhoneStore));
