/**
 * @jsx React.DOM
 */
//= require react
//= require stores/member-store
var AdminMembers = React.createClass({displayName: 'AdminMembers',
  getInitialState: function() {
    return {
      members: []
    };
  },
  componentDidMount: function() {
    MemeberStore.addChangeEvent(function() {
      if(this.isMounted()) this.setState({ members: MemeberStore.members() })
    }.bind(this))
    MemeberStore.all(this.props.type);
  },
  render: function() {
    var members = [];
    this.state.members.forEach(function(member) {
      members.push(React.createElement("li", {className: "list-group-item"}, member.email))
    })
    return (
      React.createElement("ul", {className: "list-group"}, 
        members
      )
    );
  }
});
