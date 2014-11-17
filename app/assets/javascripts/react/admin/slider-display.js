/**
 * @jsx React.DOM
 */
//= require react

var SliderDisplay = React.createClass({displayName: 'SliderDisplay',
  getInitialState: function(){
    return {
      errors: []
    }
  },
  render: function(){
    return (
      React.createElement("h1", null, "Slider Display Settings")
    )
  }
})
