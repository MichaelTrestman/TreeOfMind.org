//= require dispatchers/ToM-dispatcher
//= require constants/ToM-constants
var AuthorActions = {
  displayAuthor: function(id){
    ToMDispatcher.handleViewAction({
        type: ToMConstants.DISPLAY_AUTHOR,
        id: id
    });
  },
  createAuthor: function(data){
    ToMDispatcher.handleViewAction({
        type: ToMConstants.CREATE_AUTHOR,
        data: data
    });
  },
  updateAuthor: function (data) {
    ToMDispatcher.handleViewAction({
        type: ToMConstants.UPDATE_AUTHOR,
        data: data
    });
  },
  destroyAuthor: function(id){
    ToMDispatcher.handleViewAction({
      type: ToMConstants.DESTROY_AUTHOR,
      id: id
    })
  }
};