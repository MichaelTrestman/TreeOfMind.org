//= require constants/apted-constants
//= require dispatchers/apted-dispatcher

var LinkStore = (function () {
	var _links = [];
	var CHANGE_EVENT = 'change';
	var FAIL_TO_CREATE_EVENT = 'creation-failed';

  return {
    all: function(linkable_type, linkable_id){
      $.ajax({
        url: '/member/links',
        type: 'GET',
        data: {link: {linkable_type: linkable_type, linkable_id: linkable_id} }
      })
      .done(function(data){
        _links = data.links;
        this.triggerChange();
      }.bind(this))
    },

    links: function() {
      return _links;
    },

    new: function () {
      return {
        id: null,
        url: null,
        kind: null
      }
    },

    triggerChange: function (data) {
      $(this).trigger(CHANGE_EVENT, data);
    },
    addFailToTakeAction: function (callback) {
      $(this).on(FAIL_TO_CREATE_EVENT, callback);
    },
    addChangeEvent: function (callback) {
      $(this).on(CHANGE_EVENT, callback);
    },
    triggerFailToTakeAction: function(data) {
      $(this).trigger(FAIL_TO_CREATE_EVENT, data);
    },

    create: function(data) {
      $.ajax({
        url: '/member/links',
        type: 'POST',
        data: {link: data}
      })
      .done(function(response) {
        _links.push(response.link);
        this.triggerChange();
      }.bind(this))
      .fail(function (xhr) {
        this.triggerFailToTakeAction([xhr.responseJSON.errors]);
      }.bind(this));
    },

    update: function(data) {
      $.ajax({
        url: '/member/links/' + data.id,
        type: 'PUT',
        data: {link: data}
      })
      .done(function (data) {
        var updatedLink = data.link;
        _links.forEach(function (link, i) {
          if (link.id === updatedLink.id) {
            _links[i] = updatedLink;
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
        url: '/member/links/' + id
      })
      .done(function (data) {
        _links.forEach(function (link, i) {
          if (link.id === id) {
            _links.splice(i, 1)[0];
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
        case AptedConstants.CREATE_LINK:
          this.create(action.data);
          break;
        case AptedConstants.UPDATE_LINK:
          this.update(action.data);
          break;
        case AptedConstants.DESTROY_LINK:
          this.delete(action.id);
          break;
        default:
      }
    }
  };
}());

AptedDispatcher.register(LinkStore.payload.bind(LinkStore));
