/** @jsx React.DOM */
//= require react
//= require react/admin/group
//= require stores/group-store
//= require form-for
var Groups = React.createClass({displayName: 'Groups',
  getInitialState: function() {
    return {
      groups: [],
      errors: []
    };
  },
  componentDidMount: function() {
    GroupStore.addChangeEvent(function() {
      if(this.isMounted()) this.setState({ groups: GroupStore.groups() });
    }.bind(this))
    GroupStore.addFailToTakeAction(function(e, data) {
      if(this.isMounted()) this.setState({ errors: data });
    }.bind(this))
    GroupStore.all();
  },
  render: function() {
    var groups = [];
    this.state.groups.forEach(function (gro) {
      groups.push(React.createElement(Group, {key: gro.id, group: gro, errors: this.state.errors}))
    }.bind(this));

    return (
      React.createElement("div", {id: "admin-group"}, 
        React.createElement("h1", null, "Groups"), 
        this.renderGroupForm(), 
        groups
      )
    );
  },
  renderGroupForm: function() {
    var options = {
      onSubmit: this.createGroup
    }
    return(React.createElement(FormFor, {object: GroupStore.new(), options: options, errors: this.state.errors}))
  },
  createGroup: function(data) {
    GroupActions.createGroup(data);
  }
})
