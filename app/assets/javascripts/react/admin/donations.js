/**
 * @jsx React.DOM
 */
//= require react

var Donations = React.createClass({displayName: 'Donations',
  getInitialState: function(){
    return {
      errors: []
    }
  },
  render: function(){
    return (
      React.createElement("h1", null, " Donation Packages")
    )
  }
})
