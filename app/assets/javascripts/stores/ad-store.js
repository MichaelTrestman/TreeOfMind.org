//= require dispatchers/apted-dispatcher
//= require constants/apted-constants

var AdStore = (function() {
  var _ads = [];
  var CHANGE_EVENT = 'change';
  var FAIL_TO_CREATE_EVENT = 'creation-failed';

  return {
    activeAds: function() {
      $.ajax({
        url: '/ads',
        type: 'GET'
      }).done(function(response) {
        this.triggerChange([response.ads]);
      }.bind(this))
    },
    ads: function() {
      return _ads;
    },
    all: function(data) {
      $.ajax({
        url: '/admin/ads',
        type: 'GET'
      }).done(function(response) {
        _ads = response.ads;
        this.triggerChange(_ads);
      }.bind(this))
    },
    find: function(id) {
      if(_ads.length > 0) {
        var ad = _ads.filter(function(ad) {
          return ad.id == id
        })[0];
        return this.triggerChange(ad);
      }
      $.ajax({
        url: '/admin/ads/'+id,
        type: 'GET'
      }).done(function(response) {
        this.triggerChange(response.ad);
      }.bind(this))
    },
    new: function(){
       return {
        organization: null,
        url: null,
        starts: null,
        ends: null
      }
    },
    create: function(data) {
      $.ajax({
        url: '/admin/ads',
        type: 'POST',
        data: {ad: data}
      }).done(function(response) {
        console.log(response)
        _ads.push(response.ad);
        this.triggerChange(_ads);
      }.bind(this))
      .fail(function (xhr) {
        this.triggerFailToTakeAction([xhr.responseJSON.errors]);
      }.bind(this));
    },
    update: function(data) {
      $.ajax({
        url: '/admin/ads/'+data.id,
        type: 'PUT',
        data: {ad: data}
      }).done(function(response) {
        _ads.forEach(function (ad, i) {
          if (ad.id === response.ad.id) {
            _ads[i] = response.ad
            return this.triggerChange();
          }
        this.triggerChange();
        }.bind(this))
      }.bind(this))
      .fail(function (xhr) {
        this.triggerFailToTakeAction([xhr.responseJSON.errors]);
      }.bind(this));
    },
    delete: function(id){
      $.ajax({
        type: 'DELETE',
        url: '/admin/ads/' + id
      })
      .done(function (data) {
        _ads.forEach(function (ad, i) {
          if (ad.id === id) {
            _ads.splice(i, 1)[0];
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
    payload: function(payload) {
      var action = payload.action
      switch(action.type) {
        case AptedConstants.CREATE_AD:
          this.create(action.data);
          break;
        case AptedConstants.UPDATE_AD:
          this.update(action.data);
          break;
        case AptedConstants.DESTROY_AD:
          this.delete(action.id);
          break;
        default:
      }
    }

  }
}())

AptedDispatcher.register(AdStore.payload.bind(AdStore))
