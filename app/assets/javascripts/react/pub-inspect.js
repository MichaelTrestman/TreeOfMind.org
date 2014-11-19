/**
 * @jsx React.DOM
 */

//= require react
//= require actions/publication-actions
//= require stores/publications-store

var PubInspect = React.createClass({displayName: 'PubInspect',
  getInitialState: function(){
    return {
      thisPub: null,
      editing: false,
      topics: [],
      taxa: [],
      authors: [],
      references: []
    };
  },
  componentDidMount: function(){
    PublicationsStore.addChangeEvent(function(data){
      if(this.isMounted()) this.setState({
        editing:false,
        thisPub: PublicationsStore.activePub()
      });
    }.bind(this))
    PublicationsStore.addFailToTakeAction(function(e, data){
      if(this.isMounted()) this.setState({
        errors: data
      })
    }.bind(this));
  },
  editPub: function(e){
    e.preventDefault();
    this.setState({ editing: true })
  },

  updatePub: function(data){
    PublicationActions.updatePublication(data);
    this.setState({ editing: false })
  },
  render: function(){
    if (!this.state.thisPub){
      return (
        React.createElement("p", null, "select a publication, researcher, or taxon to display info about it here")
      )
    }
    if (this.state.editing){
      var options = {
        onSubmit: this.updatePub,
        abstract: {type: 'textarea'}
      }

      var object = this.state.thisPub;
      console.log(object)
      return (
        React.createElement(FormFor, {object: object, options: options, errors: [] })
      )
    }
    return (
      React.createElement("div", null, 
        React.createElement("h3", null, "Title: ", this.state.thisPub.title), 
        React.createElement("a", {href: "#", onClick: this.editPub}, "Edit | "), 
        React.createElement("a", {href: "#", onClick: this.delete}, "delete"), 
        React.createElement("p", null, "Abstract: ", this.state.thisPub.abstract), 
        React.createElement("ul", null, React.createElement("h4", null, "topics:"), 
          this.state.topics
        ), 
        React.createElement("ul", null, React.createElement("h4", null, "taxa:"), 
          this.state.taxa
        ), 
        React.createElement("ul", null, React.createElement("h4", null, "authors:"), 
          this.state.authors
        ), 
        React.createElement("ul", null, React.createElement("h4", null, "references:"), 
          this.state.references
        )
      )
    )

  }
})