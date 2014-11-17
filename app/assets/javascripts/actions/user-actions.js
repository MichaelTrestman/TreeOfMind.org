//= require dispatchers/apted-dispatcher
//= require constants/apted-constants
var UserActions = {
  createUser: function(data) {
    AptedDispatcher.handleViewAction({
      type: AptedConstants.CREATE_USER,
      data: data
    })
  },
  updateUser: function(data) {
    AptedDispatcher.handleViewAction({
      type: AptedConstants.UPDATE_USER,
      data: data
    })
  },
  destroyUser: function(id) {
    AptedDispatcher.handleViewAction({
      type: AptedConstants.DESTROY_USER,
      id: id
    })
  }
}
