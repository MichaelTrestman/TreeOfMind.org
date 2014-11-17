/**
 * @jsx React.DOM
 */
//= require react
//= require form-for
//= require stores/attribute-store
//= require actions/attribute-actions
//= require react/admin/admin-attribute
var AdminAttributes = React.createClass({displayName: 'AdminAttributes',
  getInitialState: function() {
    return {
      attributes: {},
      categoryNames: []
    };
  },
  componentDidMount: function() {
    AttributeStore.addChangeEvent(function() {
      if(this.isMounted()) this.setState({ categoryNames: AttributeStore.categoryNames(), attributes: AttributeStore.attributes() })
    }.bind(this));
    AttributeStore.allCategories();
  },
  render: function() {
    return (
      React.createElement("div", {className: "attributes"}, 
        this.renderCategoryForm(), 
        this.renderAttributeForm(), 
        this.renderAttributes()
      )
    );
  },
  renderAttributes: function() {
    var attributes = [];
    Object.keys(this.state.attributes).forEach(function(category) {
      attributes.push(React.createElement(AdminAttribute, {category: category, values: this.state.attributes[category]}))
    }.bind(this));
    return attributes;
  },
  renderCategoryForm: function() {
    var options = {
      onSubmit: this.createCategory
    }
    return(React.createElement(FormFor, {object: AttributeStore.newCategory(), options: options, errors: []}))
  },
  renderAttributeForm: function() {
    var values = [];
    this.state.categoryNames.forEach(function(category) {
      values.push({show: category, value: category});
    })
    console.log(values)
    var options = {
      onSubmit: this.createAttribute,
      category: {type: 'select', values: values  }
    }
    return(React.createElement(FormFor, {object: AttributeStore.newAttribute(), options: options, errors: []}))
  },

  createCategory: function(data) {
    AttributeActions.createCategory(data.category);
  },
  createAttribute: function(data) {
    AttributeActions.createAttribute(data);
  }
});

