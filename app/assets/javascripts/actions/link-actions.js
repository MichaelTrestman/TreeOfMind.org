//= require dispatchers/ToM-dispatcher
//= require constants/apted-constants
var LinkActions = {
  createLink: function (data) {
    ToMDispatcher.handleViewAction({
      type: ToMConstants.CREATE_LINK,
      data: data
    });
  },

  updateLink: function(data){
    ToMDispatcher.handleViewAction({
      type: ToMConstants.UPDATE_LINK,
      data: data
    })
  },

  destroyLink: function(id){
    ToMDispatcher.handleViewAction({
      type: ToMConstants.DESTROY_LINK,
      id: id
    })
  }
};