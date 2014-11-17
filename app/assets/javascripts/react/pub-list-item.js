/**
 * @jsx React.DOM
 */

//= require react
//= require actions/publication-actions
//= require stores/publications-store

var PubListItem = React.createClass({displayName: 'PubListItem',

  render: function  () {

    var thisPub = this.props.pub
    return (
      React.createElement("div", {className: "row"}, 
          React.createElement("h4", null, "title: ", thisPub.title), 
          React.createElement("p", null, thisPub.abstract)
      )
    )
  },

  componentDidMount: function(){
  }
})
