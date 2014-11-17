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
      React.createElement("div", {className: "list-group-item"}, 
        React.createElement("a", {href: "#", onClick: this.displayPub}, 
          React.createElement("h4", null, "title: ", thisPub.title), 
          React.createElement("p", null, thisPub.abstract)
        )
      )
    )
  },
  displayPub: function(){
    //set publication store currentPub to this publication... that will make the display update on the right
  },
  componentDidMount: function(){
  }
})
