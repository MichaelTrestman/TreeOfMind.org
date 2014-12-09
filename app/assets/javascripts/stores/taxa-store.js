//= require constants/ToM-constants
//= require dispatchers/ToM-dispatcher

var TaxaStore = (function(){
  var _taxa = [];
  var _active_taxon = {};
  var _active_taxon_subtaxa = [];
  var _active_taxon_supertaxon = {
    name: null,
    supertaxon: null
  };
  var CHANGE_EVENT = 'change';
  var FAIL_TO_CREATE_EVENT = 'creation-failed';
  return {
    addChangeEvent: function(callback){
      $(this).on(CHANGE_EVENT, callback);
    },
    addFailToTakeAction: function(callback){
      $(this).on(FAIL_TO_CREATE_EVENT, callback);
    },
    triggerChange: function (data) {
      $(this).trigger(CHANGE_EVENT, data);
    },
    triggerFailToTakeAction: function(data) {
      $(this).trigger(FAIL_TO_CREATE_EVENT, data);
    },
    activeTaxon: function(){
      return _active_taxon;
    },
    activeTaxonSuperTaxon: function(){
      return _active_taxon_supertaxon;
    },
    activeTaxonSubtaxa: function(){
      return _active_taxon_subtaxa;
    },
    taxa: function(){
      return _taxa;
    },
    all: function(query){
      if (!query) {
        query ='recent';
      };
      $.ajax({
        url: '/taxons',
        type: 'GET',
        data: {
          query: query
        }
      })
      .done(function(data){
        _taxa = data.taxons;
        this.triggerChange();
      }.bind(this))
    },
    display: function(id){
      console.log('id to display:')
      console.log(id)
      _taxa.forEach(function(taxon){
        if(id===taxon.id){
          _active_taxon = taxon;
          _active_taxon_supertaxon = taxon.supertaxon;
          _active_taxon_subtaxa = taxon.subtaxa;
        }
      });
      $.ajax({
        url: '/taxons/' + id,
        type: 'GET',
        data: {id: id}
      })
      .done(function(data){
        console.log('should be a taxon here:')
        console.log(data.taxon)
        _active_taxon = data.taxon;
        _active_taxon_supertaxon = data.taxon.supertaxon;
        _active_taxon_subtaxa =data.taxon.subtaxa;
        this.triggerChange();
      }.bind(this))
    },
    payload: function(payload){
      var action = payload.action;
      switch(action.type){
        case ToMConstants.DISPLAY_TAXON:
          this.display(action.id);
          break;
        case ToMConstants.UPDATE_TAXON:
          this.update(action.id);
          break;
        case ToMConstants.DESTROY_TAXON:
          this.destroy(action.id);
          break;
          default:
      }
    }


  }

}());

ToMDispatcher.register(TaxaStore.payload.bind(TaxaStore));