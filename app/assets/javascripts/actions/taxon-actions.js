//= require dispatchers/ToM-dispatcher
//= require constants/ToM-constants
var TaxonActions = {
  displayTaxon: function(id){
    ToMDispatcher.handleViewAction({
    type: ToMConstants.DISPLAY_TAXON,
      id: id
    });
  },
  createTaxon: function(data){
    ToMDispatcher.handleViewAction({
      type: ToMConstants.CREATE_TAXON,
      data: data
    });
  },
  updateTaxon: function(data){
    ToMDispatcher.handleViewAction({
      type: ToMConstants.UPDATE_TAXON,
      data: data
    })
  },
  destroyTaxon: function(id){
    ToMDispatcher.handleViewAction({
      type: ToMConstants.DESTROY_TAXON,
      id: id
    })
  }
};