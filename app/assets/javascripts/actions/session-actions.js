//= require dispatchers/apted-dispatcher
//= require constants/apted-constants
var SessionActions = {
  createSession: function(data) {
    AptedDispatcher.handleViewAction({
      type: AptedConstants.CREATE_SESSION,
      data: data
    })
  }
}
