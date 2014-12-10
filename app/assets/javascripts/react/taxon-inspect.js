/**
 * @jsx React.DOM
 */

//= require react
//= require actions/taxon-actions
//= require stores/taxa-store

var TaxonInspect = React.createClass({displayName: 'TaxonInspect',
  getInitialState: function(){
    return {
      thisTaxon: null,
      editing: false,
      superTaxon: null,
      publications: [],
      topics: [],
      subtaxa: []
    };
  },
  componentDidMount: function(){
    console.log('taxon component did mounting')
    TaxaStore.addChangeEvent(
      function(data){
        console.log('yo!')
        if(this.isMounted()) this.setState({
          editing: false,
          thisTaxon: TaxaStore.activeTaxon(),
          superTaxon: TaxaStore.activeTaxonSuperTaxon(),
          subtaxa: TaxaStore.activeTaxonSubtaxa()
        });
      }.bind(this))
    TaxaStore.addFailToTakeAction(function(e, data){
      if(this.isMOunted()) this.setState({
        errors: data
      })
    }.bind(this));
    TaxaStore.display();
  },
  renderList: function (tags) {
    var tagList = [];
    if (tags && tags.length > 0) {
      tags.forEach(function(tag){
        if(tag.title){
          tagList.push(
            React.createElement("li", {class: "list-group-item"},
            React.createElement(PubListItem, {key: tag.id, pub: tag, errors: []})
          )
          )
        } else if (tag.first_name){
          tagList.push(
            React.createElement(AuthorListItem, {key: tag.id, author: tag, errors: []})
          )
        } else if (tag.name){
          tagList.push(
            React.createElement(TaxonListItem, {key: tag.id, taxon: tag, errors: []})
          )
        }
      })
    };
    return tagList
  },
  render: function(){

    console.log('trying to render :/')
    if (this.state.editing) {
      var options = {
        onSubmit: this.updateTaxon
      }
      var object = {
        title: this.state.thisTaxon.taxon.title
      };
      console.log(this.state)
      return (React.createElement("div", null))
    } else if (this.props.creating) {
      console.log("creating!!!")
      return (React.createElement("div", null))
    } else if (!this.state.thisTaxon) {
      console.log('no current taxon!')
      return (React.createElement("div", null, "select a taxon"))
    }
    else {
      thisTaxon = this.state.thisTaxon
      return (
        React.createElement("div", null,
          React.createElement("h3", null, "Name: ",  thisTaxon.name),
          React.createElement("h4", null, "Supertaxon: ",  this.state.superTaxon),
          React.createElement("button", {onClick: this.editPub}, "Edit"),
          React.createElement("button", {onClick: this.deletePub}, " Delete "),
          React.createElement("div", {className: "row"},
            React.createElement("div", {className: "col-lg-3 infoPanel"},
              React.createElement("ul", {className: "scrollyballz"},
                React.createElement("p", {className: "tagName"}, "subtaxa: "),
                this.state.subtaxa ? this.renderList(this.state.subtaxa) : 'no stupid subtaxa'
              )
            ),
            React.createElement("div", {className: "col-lg-3 infoPanel"},
              React.createElement("ul", null,
                React.createElement("p", {className: "tagName"}, "references:"),
                this.renderList(this.state.thisTaxon.publications)
              )
            ),
            React.createElement("div", {className: "col-lg-3 infoPanel"},
              React.createElement("ul", null,
                React.createElement("p", {className: "tagName"}, "topics:"),
                this.renderList(this.state.thisTaxon.topics)
              )
            )
          )
        )
      )
    };
  }
})
