/**
 * @jsx React.DOM
 */
//= require react
//= require stores/attribute-store
//= require actions/attribute-actions
var AdminAttribute = React.createClass({displayName: 'AdminAttribute',

  render: function() {
    return (
      React.createElement("div", {className: "panel panel-default"}, 
        React.createElement("div", {className: "panel-heading"}, this.props.category, " (", this.renderEditLinks(), ")"), 
        React.createElement("ul", {className: "list-group"}, 
          this.renderValues()
        )
      )
    );
  },
  renderValues: function() {
    if(typeof this.props.values !== 'object') return;
    var values = [];
    Object.keys(this.props.values).forEach(function(key) {
      values.push(React.createElement("li", {className: "list-group-item"}, key))
    }.bind(this))
    return values;
  },
  renderEditLinks: function() {
    return(React.createElement("small", null, React.createElement("a", {onClick: this.destroyCategory}, "delete")))
  },
  destroyCategory: function(e) {
    e.preventDefault();
    AttributeActions.destoryCategory(this.props.category);
  }

});
