//= require constants/apted-constants
//= require dispatchers/apted-dispatcher

var StaffStore = (function (){
  var _staffs = [];
  var CHANGE_EVENT = 'change';
  var FAIL_TO_CREATE_EVENT = 'creation-failed';

  return {
    all: function(staffable_type, staffable_id){
        $.ajax({
        url: '/member/staffs',
        type: 'GET',
        data: {staff: {staffable_type: staffable_type, staffable_id: staffable_id}}
      })
      .done(function (data) {
        _staffs = data.staffs;
        this.triggerChange();
      }.bind(this))
    },

    staffs: function(){
      return _staffs
    },

    new: function(){
      return {
        name: null,
        title: null
      }
    },

    create: function(data){
        $.ajax({
        url: '/member/staffs',
        type: 'POST',
        data: {staff: data}
      })
      .done(function (data) {
        console.log(data)
        _staffs.unshift(data.staff);
        this.triggerChange();
      }.bind(this))
      .fail(function (xhr) {
        this.triggerFailToTakeAction([xhr.responseJSON.errors]);
      }.bind(this));
    },

    update: function (data) {
      $.ajax({
        url: '/member/staffs/' + data.id,
        type: 'PUT',
        data: {staff: data}
      })
      .done(function (data) {
        _staffs.forEach(function (stf, i) {
          if (stf.id === data.staff.id) {
            _staffs[i] = data.staff;
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
        url: '/member/staffs/' + id
      })
      .done(function (data) {
        _staffs.forEach(function (stf, i) {
          if (stf.id === id) {
            _staffs.splice(i, 1)[0];
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
        case AptedConstants.CREATE_STAFF:
          this.create(action.data);
          break;
        case AptedConstants.UPDATE_STAFF:
          this.update(action.data);
          break;
        case AptedConstants.DESTROY_STAFF:
          this.delete(action.id);
          break;
        default:
      }

    }
}

}());

AptedDispatcher.register(StaffStore.payload.bind(StaffStore))
