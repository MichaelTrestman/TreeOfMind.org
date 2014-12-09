/**
 * @jsx React.DOM
 */
//= require react
//= require actions/publication-actions
//= require form-for
//= require react/taxon-list-item
//= require react/taxon-inspect

//= require stores/taxa-store

var TaxonListBrowseDisplay = React.createClass({
  getInitialState: function(){
    return {
      pubs: [],
      authors: [],
      topics: [],
      query: null,
      creatingNew: false,
      errors: []
    }
  },
componentDidMount: function(){
    TaxaStore.addChangeEvent(function(){
      if(this.isMounted()) this.setState({
        taxa: TaxaStore.taxa(),
        creatingNew: false
      });
    }.bind(this));
    TaxaStore.addFailToTakeAction(function(e, data){
      if(this.isMounted()) this.setState({ errors: data })
    }.bind(this))
    TaxaStore.all()
  },
  renderCreationFormButton: function(){
    return(
      <a href='#new_taxon'>Create New Taxon Record</a>
    )
  },
  renderCreationForm: function(){
    if(!this.state.creatingNew) return;
    var options = {
      onSubmit: this.createTaxon
    }
    return (
      <FormFor object={ TaxaStore.newTaxon() } options = { options } errors = { this.state.errors }/>
    )
  },
  toggleCreationForm: function(e){
    e.preventDefault();
    this.setState({
      creatingNew: !this.state.creatingNew
    })
  },
  createTaxon: function(data){
    TaxonActions.createTaxon(data);
  },
  updateQuery: function(e){
    var query = e.target.value;
    this.setState({ query: query })
    TaxaStore.all(query)
  },
  render: function(){
    taxa = [];
    if(this.state.taxa){
      this.state.taxa.forEach(function(taxon){
        taxa.push(
          <li class='list-group-item'>
            <TaxonListItem key={taxon.id} taxon={taxon} errors={this.state.errors} />
          </li>
        )
      }.bind(this));
    }
    return(
      <div>
        <div className='row'>
          <div id='taxa-display'>
            <a href='#list_publications'>Publications  |</a>
            <a href='#list_authors'>authors  |</a>
            <a href='#list_topics'>topics</a>
            <h3>Taxa</h3>
            {this.renderCreationFormButton()}
            <div>
              Search Query
              <input onChange={this.updateQuery} type='text' ></input>
            </div>
            <div className='scrollyballz'>
              <ul className='list-group'>
                {taxa}
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }
})