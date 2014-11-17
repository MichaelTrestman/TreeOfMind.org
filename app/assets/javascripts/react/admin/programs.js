/**
 * @jsx React.DOM
 */
//= require react
//= require react/admin/admin-members
var Programs = React.createClass({displayName: 'Programs',
  render: function(){
    return(
      React.createElement("div", {className: "individual-providers"}, 
        React.createElement("h1", null, "All Programs"), 
        React.createElement(AdminMembers, {type: "Program"})
      )
    )
  }
})
