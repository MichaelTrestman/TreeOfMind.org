/**
 * @jsx React.DOM
 */
//= require react
//= require actions/publication-actions
//= require form-for
//= require stores/publications-store
//= require react/pub-list-item
//= require react/pub-inspect


var PubListBrowseDisplay = React.createClass({
  getInitialState: function(){
    return {
      pubs: [],
      taxa: [],
      topics: [],
      authors: [],
      query: null,
      searching: false,
      creatingNew: false,
      errors: []
    }
  },
  componentDidMount: function(){
    PublicationsStore.addChangeEvent(function(){
      if(this.isMounted()) this.setState({
        publications: PublicationsStore.publications(),
        creatingNew: false
      });
    }.bind(this))
    PublicationsStore.addFailToTakeAction(function(e, data){
      if(this.isMounted()) this.setState({ errors: data })
    }.bind(this))
    PublicationsStore.all()
  },

  renderCreationFormButton: function(){
    return(
      <a href="#" onCLick={this.toggleCreationForm}>
          {this.state.creatingNew ? "Back" : "Create New Publication Record"}
      </a>
    )
  },

  renderCreationForm: function(){
    if(!this.state.creatingNew) return;
    var options ={
      onSubmit: this.createPublication,
      abstract: { type: 'textarea'}
    }
    return (
      <FormFor object={ PublicationsStore.newPublication() } options = { options } errors = { this.state.errors } />
    )
  },
  toggleCreationForm: function(e){
    e.preventDefault();
    this.setState({creatingNew: !this.state.creatingNew})
  },
  createPublication: function(data){
    PublicationActions.createPublication(data);
  },
  updateQuery: function(e){
    var query = e.target.value
    console.log(query)
    this.setState({ query: query })
    PublicationsStore.all(query)
  },

  render: function(){
    publications = [];
    if(this.state.publications){
      this.state.publications.forEach(function(pub){
        var thisPub = pub;
        publications.push(
          <li class='list-group-item'>
            <PubListItem key={thisPub.id} pub={thisPub} errors={this.state.errors} />
          </li>
        )
      }.bind(this));
    }
    return(
      <div>

        <div className='row'>
          <div id='publications-display' >
              <a href='#taxa_list_dipslay'>Taxa  |</a>
              <a href='#authors_list_display'>  Authors  |</a>
              <a href='#topics_list_display'>  Topics</a>
            <h3>Publications</h3>
            {this.renderCreationFormButton()}

            <div>
              Search Query
              <input onChange={this.updateQuery} type='text' ></input>
            </div>

            <div className='scrollyballz'>
              <ul className='list-group'>
                {publications}
              </ul>
            </div>
          </div>

        </div>
      </div>
    )
  }
})
