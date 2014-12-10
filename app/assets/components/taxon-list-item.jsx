/**
 * @jsx React.DOM
 */

//= require react
//= require actions/taxon-actions
//= require stores/taxa-store

var TaxonListItem = React.createClass({
  render: function(){
    var thisTaxon = this.props.taxon
    return (
      <div className='list-group-item'>
        <a href='#' onClick={this.displayTaxon}>
          <h4>name: {thisTaxon.name}</h4>
          <h5>super taxon: {this.props.superTaxon}</h5>

        </a>
      </div>
    )
  },
  displayTaxon: function(e){
    e.preventDefault();
    console.log(this.props)
    TaxonActions.displayTaxon(this.props.taxon.id)
    location.href = '#inspect_taxon'
  }
})