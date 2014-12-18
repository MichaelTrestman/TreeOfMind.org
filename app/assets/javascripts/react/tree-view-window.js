/**
 * @jsx React.DOM
 */

//= require react

var TreeViewWindow = React.createClass({displayName: 'TreeViewWindow',
  render: function(){
    var _view;
    var svg =
      React.createElement("svg", {className: "svjizzle", height: "200px", width: "200px"},
        React.createElement("circle", {cx: "25", cy: "25", r: "25", fill: "purple"})
      )
    return(svg)
  }
})
