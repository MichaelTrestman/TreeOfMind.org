/**
 * @jsx React.DOM
 */

//= require react
//= require actions/publication-actions
//= require stores/publications-store
//= require constants/ToM-constants

var PubListItem = React.createClass({displayName: 'PubListItem',

  render: function(){

    var thisPub = this.props.pub
    return (
      React.createElement("div", {draggable: "true", className: "list-group-item"},
        React.createElement("a", {href: "#", onClick: this.displayPub},
          React.createElement("h4", null, "title: ", thisPub.title),
          React.createElement("p", null, thisPub.abstract)
        )
      )
    )
  },
  displayPub: function(e){
    e.preventDefault();
    location.href = '#inspect_publication/' + this.props.pub.id.toString();
  },
  handleDragStart: function(e){
    this.style.opacity = '0.4';
    ToMGlobals.dragSrcEl = this;
    // e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.props.pub);
  }.bind(this),
  handeDragEnd: function(e){
    this.style.opacity = '1.0';
  }
})
