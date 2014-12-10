/**
 * @jsx React.DOM
 */
//= require react
//= require actions/publication-actions
//= require form-for
//= require react/taxon-list-item
//= require react/taxon-inspect

//= require stores/taxa-store

var TaxonListBrowseDisplay = React.createClass({displayName: 'TaxonListBrowseDisplay',
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
      React.createElement("a", {href: "#new_taxon"}, "Create New Taxon Record")
    )
  },
  renderCreationForm: function(){
    if(!this.state.creatingNew) return;
    var options = {
      onSubmit: this.createTaxon
    }
    return (
      React.createElement(FormFor, {object:  TaxaStore.newTaxon(), options: options, errors:  this.state.errors})
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
          React.createElement("li", {class: "list-group-item"},
            React.createElement(TaxonListItem, {key: taxon.id, taxon: taxon, errors: this.state.errors})
          )
        )
      }.bind(this));
    }
    return(
      React.createElement("div", null,
        React.createElement("div", {className: "row"},
          React.createElement("div", {id: "taxa-display"},
            React.createElement("a", {href: "#list_publications"}, "Publications  |"),
            React.createElement("a", {href: "#list_authors"}, "authors  |"),
            React.createElement("a", {href: "#list_topics"}, "topics"),
            React.createElement("h3", null, "Taxa"),
            this.renderCreationFormButton(),
            React.createElement("div", null,
              "Search Query",
              React.createElement("input", {onChange: this.updateQuery, type: "text"})
            ),
            React.createElement("div", {className: "scrollyballz"},
              React.createElement("ul", {className: "list-group"},
                taxa
              )
            )
          )
        )
      )
    )
  }
})
