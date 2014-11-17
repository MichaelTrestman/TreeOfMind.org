var Router = (function(){
  var _isFunction = function(object) {
    return object && typeof(object) == 'function';
  }
  return {
    routes: {},
    route: function(location) {
      var params = this.locationParams(location);
      var locationHandler = this.routes[params[0]];
      if(locationHandler && _isFunction(locationHandler)) return locationHandler(params[1]);
    },
    locationParams: function(location) {
      var params = /(\D+)\/?(\d*)$/.exec(location);
      if(!params) return [""];
      return [params[1], params[2]];
    }
  }
}());
