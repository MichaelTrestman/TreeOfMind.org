/**
 @jsx React.DOM
*/
//= require react
//= require form-for
//= require stores/organization-store
//= require stores/address-store
//= require actions/organization-actions

var Organizations = React.createClass({displayName: 'Organizations',
  getInitialState: function(){
    return {
      organizations: [],
      errors: []
    };
  },
  componentDidMount: function() {
    OrganizationStore.addChangeEvent(function() {
      if(this.isMounted()) this.setState({ organizations: OrganizationStore.organizations() });
    }.bind(this))
    OrganizationStore.addFailToTakeAction(function(data) {
      if(this.isMounted()) this.setState({ errors: data });
    }.bind(this))
    OrganizationStore.all();

  },
  render: function(){

    var organizations = []
    this.state.organizations.forEach(function(org) {
      organizations.push(React.createElement("li", null, React.createElement("a", {href: "/#organizations/"+org.id, className: "list-group-item"}, org.name)));
    }.bind(this));
    return (
      React.createElement("div", {className: "organizations"}, 
        React.createElement("h1", null, "Organizations"), 
        this.renderOrganizationForm(), 
        React.createElement("ul", null, 
          organizations
        )
      )
      )
  },

  renderOrganizationForm: function(){
    var options = { onSubmit: this.createOrganization}
    return( React.createElement(FormFor, {object: OrganizationStore.new(), options: options, errors: this.state.errors}))
  },

  createOrganization: function(data){
    OrganizationActions.createOrganization(data);
  },
  deleteOrganization: function(e){

    e.preventDefault();
    OrganizationActions.destroyOrganization(parseInt(e.target.dataset.id))
  }
});

