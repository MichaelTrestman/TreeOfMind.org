//= require dispatchers/apted-dispatcher
//= require constants/apted-constants
//= require stores/session-store
var EventStore = (function() {
  var _events = [];
  var CHANGE_EVENT = 'change';
  var FAIL_TO_CREATE_EVENT = 'creation-failed';

  return {
    events: function() {
      return _events;
    },
    calendarEvents: function() {
      return this.events().map(function(evt) {
        return {id: evt.id, title: evt.name, start: evt.starts, end: evt.ends, repeat: evt.repeat, description: evt.description, cost: evt.description, cost: evt.cost, continuing_education: evt.continuing_education, website_link: evt.website_link}
      });
    },
    all: function(data) {
      $.ajax({
        url: '/events',
        type: 'GET'
      }).done(function(response) {
        _events = response.events;
        this.triggerChange(_events);
      }.bind(this))
    },
    find: function(id) {
      if(_events.length > 0) {
        var event = _events.filter(function(event) {
          return event.id == id
        })[0];
        return this.triggerChange(event);
      }
      $.ajax({
        url: '/events/'+id,
        type: 'GET'
      }).done(function(response) {
        this.triggerChange(response.event);
      }.bind(this))
    },
    new: function(){
      return {
        name: null,
        starts: null,
        ends: null,
        repeat: false,
        description: null,
        cost: 0,
        continuing_education: null,
        website_link: null
      }
    },
    create: function(data) {
      $.ajax({
        url: '/admin/events',
        type: 'POST',
        data: {event: data, authenticity_token: SessionStore.getAuthenticityToken() }
      }).done(function(response) {
        _events.push(response.event);
        this.triggerChange();
      }.bind(this))
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
    payload: function(data) {
      switch(data.action.type) {
        case AptedConstants.CREATE_EVENT:
          this.create(data.action.data)
          break;
        default:
        //do nothing
      }
    }

  }
}())

AptedDispatcher.register(EventStore.payload.bind(EventStore))
