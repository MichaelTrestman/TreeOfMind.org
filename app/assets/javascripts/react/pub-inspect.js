/**
 * @jsx React.DOM
 */

//= require react
//= require actions/publication-actions
//= require stores/publications-store

var PubInspect = React.createClass({displayName: 'PubInspect',
  render: function(){
    return (
      React.createElement("p", null, "select a publication, researcher, or taxon to display info about it here")
    )

  }
})