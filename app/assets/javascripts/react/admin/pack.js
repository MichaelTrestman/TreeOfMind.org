/**
 @jsx React.DOM
*/
//= require react
//= require actions/pack-actions
//= require form-for
//= require stores/pack-store

var Pack = React.createClass({displayName: 'Pack',
  getInitialState: function(){
    return { editing: false };
  },
  render: function(){
    return(
      React.createElement("div", {className: "advertisement-management"}, 
         this.state.editing ? this.renderEditForm() : this.renderPack()
      )
    )
  },
  componentDidMount: function(){
    PackStore.addChangeEvent(function(data){
      if(this.isMounted()) this.setState({ editing: false });
    }.bind(this))
  },
  renderEditForm: function(){

    var options = {
      onSubmit: this.updatePack,
      description: { type: 'textarea' }
    }

    var object = this.props.pack;

    if(this.props.type=='AdvertisingPackage'){
      options.duration_type =
      { type: 'select', values: [{value: "Days", show: "Days"}, {value: "Weeks", show: "Weeks"}, {value: "Months", show: "Months"}] }
    } else {
      delete object['duration_type']
      delete object['duration_count']
    }

    return (
      React.createElement(FormFor, {object: object, options: options, errors:  this.props.errors})
    )
  },
  editPack: function(e){
    e.preventDefault();
    this.setState({ editing: true })
  },
  updatePack: function(data){
    PackActions.updatePack(data);
    this.setState({ editing: false })

  },
  deletePack: function(e){
    e.preventDefault();
    PackActions.destroyPack(this.props.pack.id);
  },
  renderPack: function(){
    var pack = this.props.pack
    return (
      React.createElement("div", {className: "panel panel-default"}, 
        React.createElement("div", {className: "panel-heading"},  pack.name), 
        React.createElement("div", {className: "panel-body"}, 
          React.createElement("a", {href: "#", onClick: this.editPack}, "Edit | "), 
          React.createElement("a", {href: "#", onClick: this.deletePack}, "Delete"), 
          React.createElement("p", null,  pack.description)
        ), 
        React.createElement("ul", {className: "list-group"}, 
          React.createElement("li", {className: "list-group-item"}, React.createElement("b", null, "Price: "), " ",  pack.price), 
          React.createElement("li", {className: "list-group-item"}, React.createElement("b", null, "Duration: "), React.createElement("a", {href:  pack.duration_count},  pack.duration_type))
        )
      )
    )
  }
})
