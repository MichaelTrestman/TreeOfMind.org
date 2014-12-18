/**
 * @jsx React.DOM
 */

//= require react

var TreeViewWindow = React.createClass({
  render: function(){
    var _view;
    var svg =
      <svg className='svjizzle' height='200px' width = '200px'>
        <circle cx="25" cy="25" r="25" fill="purple" />
      </svg>
    return(svg)
  }
})