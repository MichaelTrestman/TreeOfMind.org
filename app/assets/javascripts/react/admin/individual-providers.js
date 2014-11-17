/**
 * @jsx React.DOM
 */
//= require react
//= require react/admin/admin-members
var IndividualProviders = React.createClass({displayName: 'IndividualProviders',
  render: function(){
    return(
      React.createElement("div", {className: "individual-providers"}, 
        React.createElement("h1", null, "All Individual Providers"), 
        React.createElement(AdminMembers, {type: "IndividualProvider"})
      )
    )
  }
})
