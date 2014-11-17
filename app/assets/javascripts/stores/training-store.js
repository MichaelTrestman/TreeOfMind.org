//= require constants/apted-constants
//= require dispatchers/apted-dispatcher
//= stores/training-store

var TrainingStore = (function () {
  var _trainingOpportunities =[];
  var CHANGE_EVENT = 'change';
  var FAIL_TO_UPDATE_EVENT = "update-failed";
  return {
    all: function() {
      $.ajax({
        url: '/admin/training_opportunities',
        type: 'GET'
      })
      .done(function (data) {
        _trainingOpportunities = data.training_opportunities;
        this.triggerChange();
      }.bind(this))
    },
    trainingOpportunities: function() {
      return _trainingOpportunities
    },
    new: function () {
      return {
        employer_name:  null,
        employer_website:  null,
        employer_location: null,
        position_name: null,
        job_description: null,
        responsibilities: null,
        requirements: null,
        contact_phone: null,
        contact_email: null,
        contact_website: null,
        to_apply: null,
        poster_initials: null
      };
    },
    create: function (data) {
      $.ajax({
        url: 'training_opportunities/',
        type: 'POST',
        data: { trainingOpportunities : data }
      })
      .done(function (data) {
        _trainingOpportunities.push(data.training_opportunity);
        this.triggerChange();
      }.bind(this))
      .fail(function (xhr) {
        this.triggerFailToTakeAction([xhr.responseJSON.errors]);
      }.bind(this));
    },
    update: function (data) {
      $.ajax({
        url: 'training_opportunities/' + data.id,
        type: 'PUT',
        data: { trainingOpportunities: data }
      })
      .done(function (data) {
        var opportunity = data.training_opportunity;
        _trainingOpportunities.forEach(function (train, i) {
          if (train.id === opportunity.id) {
            _trainingOpportunities[i] = opportunity;
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
        url: "training_opportunities/" + id
      })
      .done(function (data) {
        _trainingOpportunities.forEach(function (trOpps, i) {
          if (trOpps.id === id) {
            _trainingOpportunities.splice(i, 1)[0];
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
    triggerChange: function (data) {
      $(this).trigger(CHANGE_EVENT, data);
    },
    addFailToTakeAction: function(callback) {
      $(this).on(FAIL_TO_UPDATE_EVENT, callback);
    },
    triggerFailToTakeAction: function(data) {
      $(this).trigger(FAIL_TO_UPDATE_EVENT, data);
    },
    payload: function (payload) {
      var action = payload.action;
      switch(action.type) {
        case AptedConstants.CREATE_TRAINING:
          this.create(action.data);
          break;
        case AptedConstants.UPDATE_TRAINING:
          this.update(action.data);
          break;
        case AptedConstants.DESTROY_TRAINING:
          this.delete(action.id);
          break;
        default:
      }
    }
  }
}());

AptedDispatcher.register(TrainingStore.payload.bind(TrainingStore));
//
//
