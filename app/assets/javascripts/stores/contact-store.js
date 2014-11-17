//= require constants/apted-constants
//= require dispatchers/apted-dispatcher

var ContactStore = (function () {
  var _contacts = [];
  var CHANGE_EVENT = 'change';
  var FAIL_TO_CREATE_EVENT = 'creation-failed';

  return {
    all: function(type, id) {
      $.ajax({
        url: '/contacts',
        type: 'GET',
        data: { contact: {contactable_type: type, contactable_id: id} }
      })
      .done(function (data) {
        _contacts = data.contacts;
        this.triggerChange();
      }.bind(this))
    },
    contacts: function() {
      return _contacts;
    },
    new: function () {
      return {
        name: null,
        email: null,
        website: null,
        contact_hours: null
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
        url: '/contacts',
        type: 'POST',
        data: { contact: data }
      })
      .done(function (data) {
        _contacts.push(data.contact);
        this.triggerChange();
      }.bind(this))
      .fail(function (xhr) {
        this.triggerFailToTakeAction([xhr.responseJSON.errors]);
      }.bind(this));
    },

    update: function (data) {
      $.ajax({
        url: '/contacts/' + data.id,
        type: 'PUT',
        data: {contact: data}
      })
      .done(function (data) {
        _contacts.forEach(function (con, i) {
          if (con.id === data.contact.id) {
            _contacts[i] = data.contact;
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
        url: '/contacts/' + id
      })
      .done(function (data) {
        _contacts.forEach(function (con, i) {
          if (con.id === id) {
            _contacts.splice(i, 1)[0];
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
        case AptedConstants.CREATE_CONTACT:
          this.create(action.data);
          break;
        case AptedConstants.UPDATE_CONTACT:
          this.update(action.data);
          break;
        case AptedConstants.DESTROY_CONTACT:
          this.delete(action.id);
          break;
        default:
      }
    }
  }
}());

AptedDispatcher.register(ContactStore.payload.bind(ContactStore));
