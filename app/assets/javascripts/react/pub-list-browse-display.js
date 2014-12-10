/**
 * @jsx React.DOM
 */
//= require react
//= require actions/publication-actions
//= require form-for
//= require stores/publications-store
//= require react/pub-list-item
//= require react/pub-inspect

var PubListBrowseDisplay = React.createClass({displayName: 'PubListBrowseDisplay',
  getInitialState: function(){
    return {
      pubs: [],
      // taxa: [],
      // topics: [],
      // authors: [],
      query: null,
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
      React.createElement("a", {href: "#new_publication"
      },
      "Create New Publication Record"
      )
    )
  },

  renderCreationForm: function(){
    if(!this.state.creatingNew) return;
    var options ={
      onSubmit: this.createPublication,
      abstract: { type: 'textarea'}
    }
    return (
      React.createElement(FormFor, {object:  PublicationsStore.newPublication(), options: options, errors:  this.state.errors})
    )
  },
  toggleCreationForm: function(e){
    e.preventDefault();
    this.setState({creatingNew: !this.state.creatingNew
    })
  },
  createPublication: function(data){
    PublicationActions.createPublication(data);
  },
  updateQuery: function(e){
    var query = e.target.value;
    this.setState({ query: query })
    PublicationsStore.all(query)
  },

  render: function(){
    publications = [];
    if(this.state.publications){
      this.state.publications.forEach(function(pub){
        var thisPub = pub;
        publications.push(
          React.createElement("li", {class: "list-group-item"},
            React.createElement(PubListItem, {key: thisPub.id, pub: thisPub, errors: this.state.errors})
          )
        )
      }.bind(this));
    }
    return(
      React.createElement("div", null,
        React.createElement("div", {className: "row"},
          React.createElement("div", {id: "publications-display"},
            React.createElement("a", {href: "#list_taxa"}, "Taxa  |"),
            React.createElement("a", {href: "#list_authors"}, "  Authors  |"),
            React.createElement("a", {href: "#list_topics"}, "  Topics"),
            React.createElement("h3", null, "Publications"),
            this.renderCreationFormButton(),

            React.createElement("div", null,
              "Search Query",
              React.createElement("input", {onChange: this.updateQuery, type: "text"})
            ),

            React.createElement("div", {className: "scrollyballz"},
              React.createElement("ul", {className: "list-group"},
                publications
              )
            )
          )
        )
      )
    )
  }
})
