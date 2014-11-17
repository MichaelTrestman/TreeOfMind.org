/**
 * @jsx React.DOM
 */
//= require react

var ContactPage = React.createClass({displayName: 'ContactPage',
  getInitialState: function(){
    return {
      errors: []
    }
  },
  render: function(){
    return (
      React.createElement("div", null, " contacts and whatnot"
      )
    )
  }
})
