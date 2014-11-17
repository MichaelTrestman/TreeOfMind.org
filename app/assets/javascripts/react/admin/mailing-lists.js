/**
 * @jsx React.DOM
 */
//= require react

var MailingLists = React.createClass({displayName: 'MailingLists',
  getInitialState: function(){
    return{
      errors: []
    }
  },
  render: function(){

    return(
      React.createElement("h1", null, "Mailing List")
      )
  }
})
