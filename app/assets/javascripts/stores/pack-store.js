//= require constants/apted-constants
//= require dispatchers/apted-dispatcher

var PackStore = (function(){
  var _adPacks = [];
  var _memPacks = [];
  var _donPacks = [];
  var CHANGE_EVENT = 'change';
  var FAIL_TO_UPDATE_PACK = 'update-failed';
  var FAIL_TO_CREATE_PACK = 'creation-failed';
  return {
    addChangeEvent: function(callback){
      $(this).on(CHANGE_EVENT, callback);
    },
    triggerChange: function(data){
      $(this).trigger(CHANGE_EVENT, data)
    },
    addFailToTakeAction: function (callback) {
      $(this).on(FAIL_TO_CREATE_PACK, callback);
    },
    triggerFailToTakeAction: function(data) {
      $(this).trigger(FAIL_TO_CREATE_PACK, data);
    },
    allAdPacks: function(){
      $.ajax({
        url: '/admin/packages',
        data: {type: 'AdvertisingPackage'},
        type: 'GET'
      })
      .done(function(data){
        _adPacks = data.packages;
        this.triggerChange();
      }.bind(this))
    },
    allDonPacks: function(){
      $.ajax({
        url: '/admin/packages',
        data: {type: 'DonationPackage'},
        type: 'GET'
      })
      .done(function(data){
        _donPacks = data.packages;
        this.triggerChange();
      }.bind(this))
    },
    donPacks: function(){
      return _donPacks
    },
    newDonPack: function(){
      return {
        name: null,
        price: 0,
        description: ''
      }
    },
    newAdPack: function(){
      return {
        name: null,
        price: 0,
        description: '',
        duration_count: 0,
        duration_type: null
      }
    },
    newMemPack: function(){
      return {
        name: null,
        price: 0,
        description: '',
        duration_count: 0,
        duration_type: null
      }
    },
    allMemPacks: function(){
      $.ajax({
        url: '/admin/packages',
        data: { type: 'MembershipPackage' },
        type: 'GET'
      })
      .done(function(data){
        _memPacks = data.packages;
        this.triggerChange();
      }.bind(this))
    },
    adPacks: function(){
      return _adPacks
    },
    memPacks: function(){
      return _memPacks
    },
    update: function(data){
      $.ajax({
        url: '/admin/packages/' + data.id,
        type: 'PUT',
        data: {package: data}
      })
      .done(function(data){
        [_memPacks, _adPacks, _donPacks].forEach(function(kindOfPack){
          kindOfPack.forEach(function(pak, i) {
            if (pak.id === data.id){
              kindOfPack[i] = data;
              return this.triggerChange();
            }
          }.bind(this))
        }.bind(this))
      }.bind(this))
      .fail(function (xhr) {
        this.triggerFailToTakeAction([xhr.responseJSON.errors]);
      }.bind(this));
    },
    delete: function(id){
      $.ajax({
        type: 'DELETE',
        url: '/admin/packages/' + id
      })
      .done(function(data){
        [_memPacks, _adPacks, _donPacks].forEach(function(kindOfPack){
          kindOfPack.forEach(function(pak, i) {
            if (pak.id === data.id){
              kindOfPack.splice(i, 1)[0];
              return this.triggerChange();
            }
          }.bind(this))
        }.bind(this))
      }.bind(this));
    },
    create: function(data){
      $.ajax({
        url: '/admin/packages',
        type: 'POST',
        data: { package: data }
      })
      .done(function(data){
        var type = data.type;
        var package = data.package;
        if (type=='AdvertisingPackage'){
          _adPacks.unshift(package);
          this.triggerChange();
        } else if (type=='MembershipPackage'){
          _memPacks.unshift(package);
          this.triggerChange();
        } else if (type=='DonationPackage'){
          _donPacks.unshift(package);
          this.triggerChange()
        }
      }.bind(this))
      .fail(function (xhr) {
        this.triggerFailToTakeAction([xhr.responseJSON.errors]);
      }.bind(this));
    },
    payload: function(payload){
      var action = payload.action;
      switch(action.type) {
        case AptedConstants.CREATE_PACK:
          this.create(action.data);
          break;
        case AptedConstants.DESTROY_PACK:
          this.delete(action.id);
          break;
        case AptedConstants.UPDATE_PACK:
          this.update(action.data);
          break
        default:
      }
    }
  }
}());

AptedDispatcher.register(PackStore.payload.bind(PackStore));
