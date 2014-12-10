/**
 * @jsx React.DOM
 */

//= require react
//= require actions/taxon-actions
//= require stores/taxa-store

var TaxonListItem = React.createClass({displayName: 'TaxonListItem',
  render: function(){
    var thisTaxon = this.props.taxon
    return (
      React.createElement("div", {className: "list-group-item"},
        React.createElement("a", {href: "#", onClick: this.displayTaxon},
          React.createElement("h4", null, "name: ", thisTaxon.name),
          React.createElement("h5", null, "super taxon: ", this.props.superTaxon)

        )
      )
    )
  },
  displayTaxon: function(e){
    e.preventDefault();
    location.href = '#inspect_taxon/' + this.props.taxon.id.toString();
  }
})
