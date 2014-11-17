/**
 * @jsx React.DOM
 */
//= require react

var SocialLinks = React.createClass({displayName: 'SocialLinks',
  getInitialState: function(){
    return {
      errors: []
    }
  },
  render: function(){
    return(
      React.createElement("h1", null, "Manage Social Media Links")
    )
  }
})
