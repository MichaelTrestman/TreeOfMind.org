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
    this.draggableID = 'pub-drag-handle-' + this.props.pub.id.toString();

    return (
      React.createElement("div", {id: this.draggableID, draggable: "true", className: "list-group-item"},
        React.createElement("a", {href: "#", onClick: this.displayPub},
          React.createElement("h4", null, "title: ", thisPub.title),
          React.createElement("p", null, thisPub.abstract)
        )
      )
    )
  },
  componentDidMount: function(){
    this.draggable = $('#' + this.draggableID);
    this.draggable[0].addEventListener('dragstart', this.handleDragStart, false);
    this.draggable[0].addEventListener('dragend', this.handleDragEnd, false);
  },
  displayPub: function(e){
    e.preventDefault();
    location.href = '#inspect_publication/' + this.props.pub.id.toString();
  },
  handleDragStart: function(e){
    // blahblah
    // e.preventDefault();
    var draggable = e.srcElement
    console.log('drag start event handled dawg')
    console.log(draggable)

    $(draggable).css('background-color', 'gold');
    draggable.style.opacity = '0.4';

    ToMGlobals.dragSrcEl = this;
    // e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.props.pub);
    console.log('should be the pub')
    console.log(this.props.pub)
  },
  handleDragEnd: function(e){
    console.log('drag end handled ')
    $(e.srcElement).css('background-color', 'white');
    e.srcElement.style.opacity = '1.0';
  }
})
