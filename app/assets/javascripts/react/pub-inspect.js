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
      // creating: false,
      topics: [],
      taxa: [],
      authors: [],
      references: []
    };
  },
  componentDidMount: function(){
    if (this.props.creating){}else{
      PublicationsStore.addChangeEvent(function(data){
        if(this.isMounted()) this.setState({
          editing: false,
          thisPub: PublicationsStore.activePub()
        });
      }.bind(this))

      PublicationsStore.addFailToTakeAction(function(e, data){
        if(this.isMounted()) this.setState({
          errors: data
        })
      }.bind(this));
      PublicationsStore.display();
    }
  },
  editPub: function(){
    this.setState({ editing: true })
  },
  updatePub: function(data){
    console.log('sending updatePub action')
    PublicationActions.updatePublication(data);
    this.setState({ editing: false })
  },
  createPub: function(data){
    PublicationActions.createPublication(data)

  },
  deletePub: function(){
    if(
        confirm('do you frlz want to delete this pub?')
      )
    {
      PublicationActions.destroyPublication(this.state.thisPub.publication.id);
      PublicationsStore.noPub()
      this.setState({
        thisPub: null
      })
    }
  },
  render: function(){

    if (this.state.editing){
      var options = {
        onSubmit: this.updatePub,
        abstract: {type: 'textarea'}
      }
      var object = {
        title: this.state.thisPub.publication.title,
        abstract: this.state.thisPub.publication.abstract
      };
      return (
        React.createElement("div", null,
          React.createElement("h3", null, "editing form!!"),
          React.createElement(FormFor, {object: object, options: options, errors: [] })
        )
      )
    } else if (this.props.creating===true) {
      var options = {
        onSubmit: this.createPub,
        abstract: { type: 'textarea' }
      }
      var object =  PublicationsStore.newPublication()

      return (
        React.createElement("div", null,
          React.createElement("h3", null, "creation form!"),
          React.createElement(FormFor, {object: object, options: options, errors: []})
        )
      )
    } else if (!this.state.thisPub){
      return (
        React.createElement("p", null, "select a publication, researcher, or taxon to display info about it here")
      )
    } else {
      return (
        React.createElement("div", null,
          React.createElement("h3", null, "Title: ",
            this.state.thisPub.publication ? this.state.thisPub.publication.title : 'none selected'
          ),
          React.createElement("button", {onClick: this.editPub}, "Edit"),
          React.createElement("button", {onClick: this.deletePub}, " Delete "),
          React.createElement("p", null, "Abstract: ", this.state.thisPub.publication ? this.state.thisPub.publication.abstract : 'none selected'),
          React.createElement("div", {className: "row"},
            React.createElement("div", {className: "col-lg-3 infoPanel"},
              React.createElement("ul", {className: "scrollyballz"},
                React.createElement("p", {className: "tagName"}, "topics:"),
                this.renderList(this.state.thisPub.topics)
              )
            ),
            React.createElement("div", {className: "col-lg-3 infoPanel"},
              React.createElement("ul", null,
                React.createElement("p", {className: "tagName"}, "taxa:"),
                this.renderList(this.state.thisPub.taxa)
              )
            ),
            React.createElement("div", {className: "col-lg-3 infoPanel"},
              React.createElement("ul", null,
                React.createElement("p", {className: "tagName"}, "authors:"),
                this.renderList(this.state.thisPub.authors)
              )
            ),
            React.createElement("div", {className: "col-lg-3 infoPanel"},
              React.createElement("ul", null,
                React.createElement("p", {className: "tagName"}, "references:"),
                this.renderList(this.state.thisPub.references)
              )
            )
          )
        )
      )
    }

  },

  renderList: function (tags) {
    var tagList = [];
    if (tags && tags.length > 0) {

      tags.forEach(function(tag){
        var label
        if(tag.title){
          label = "title" + tag.title
        } else if (tag.first_name){
          label = tag.first_name + " " + tag.last_name
        }
        tagList.push(
          React.createElement("li", null, " ", label
          )
        )
      })
    };
    return tagList
  }
})
