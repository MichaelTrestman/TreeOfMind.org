//= require dispatchers/ToM-dispatcher
//= require constants/ToM-constants
var PublicationActions = {
  createPublication: function (data) {
    ToMDispatcher.handleViewAction({
      type: ToMConstants.CREATE_PUBLICATION,
      data: data
    });
  },
  updatePublication: function (data) {
    ToMDispatcher.handleViewAction({
      type: ToMConstants.UPDATE_PUBLICATION,
      data: data
    });
  },
  destroyPublication: function(id) {
    ToMDispatcher.handleViewAction({
      type: ToMConstants.DESTROY_PUBLICATION,
      id: id
    })
  }
};
