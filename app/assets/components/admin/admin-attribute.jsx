/**
 * @jsx React.DOM
 */
//= require react
//= require stores/attribute-store
//= require actions/attribute-actions
var AdminAttribute = React.createClass({

  render: function() {
    return (
      <div className="panel panel-default">
        <div className="panel-heading">{this.props.category} ({this.renderEditLinks()})</div>
        <ul className="list-group">
          {this.renderValues()}
        </ul>
      </div>
    );
  },
  renderValues: function() {
    if(typeof this.props.values !== 'object') return;
    var values = [];
    Object.keys(this.props.values).forEach(function(key) {
      values.push(<li className="list-group-item">{key}</li>)
    }.bind(this))
    return values;
  },
  renderEditLinks: function() {
    return(<small><a onClick={this.destroyCategory}>delete</a></small>)
  },
  destroyCategory: function(e) {
    e.preventDefault();
    AttributeActions.destoryCategory(this.props.category);
  }

});
