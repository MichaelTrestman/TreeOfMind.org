/** @jsx React.DOM */
//= require react
//= require form-for
//= require stores/training-store
//= require actions/training-actions

var TrainingOpportunity = React.createClass({displayName: 'TrainingOpportunity',
  getInitialState: function(){
    return {
      editing: false
    };
  },
  componentDidMount: function() {
    TrainingStore.addChangeEvent(function(data){
      if(this.isMounted()) this.setState({ editing: false });
    }.bind(this))
  },
  render: function() {
    return (
        React.createElement("div", {className: "trainOpp"}, 
         this.state.editing ? this.renderTrainingEditForm() : this.renderTraining()
        )
    )
  },
  renderTrainingEditForm: function() {
    var options = {
      onSubmit: this.updateTraining,
        employer_name:  { type: 'text'},
        employer_website:  { type: 'url' },
        employer_location: { type: 'textarea'},
        position_name: { type: 'text'},
        job_description: { type: 'textarea' },
        responsibilities: { type: 'textarea' },
        requirements: { type: 'textarea' },
        contact_phone: { type: 'tel' },
        contact_email: { type: 'email' },
        contact_website: { type: 'url' },
        to_apply: { type: 'url'},
        poster_initials: { type: 'text'}
    }
    return (
      React.createElement(FormFor, {object:  this.props.trainingOpportunity, options: options, errors:  this.props.errors})
      )
  },
  renderTraining: function() {
    return (
      React.createElement("div", {className: "panel panel-default"}, 
        React.createElement("div", {className: "panel-heading"}, 
          this.props.trainingOpportunity.position_name, 
          this.renderEditLinks()
        ), 
        React.createElement("div", {className: "panel-body"}, 
          React.createElement("ul", {className: "list-group"}, 
            this.renderFields()
          )
        )
      )
    );
  },
  renderFields: function() {
    var fields = [];
    Object.keys(this.props.trainingOpportunity).forEach(function(key) {
      if(key == 'id' || key == 'position_name') return;
      var fieldName = key.replace("_", " ").toUpperCase();
      fields.push(React.createElement("li", {className: "list-group-item"}, fieldName, ": ", this.props.trainingOpportunity[key]))
    }.bind(this))
    return fields;
  },
  renderEditLinks: function() {
    if(this.props.admin)
      return(React.createElement("span", {className: "edit-links"}, React.createElement("a", {href: "#", onClick: this.editTraining}, " (Edit "), 
          React.createElement("a", {href: "#", onClick: this.deleteTraining}, "| Delete)")));
  },
  editTraining: function(e) {
    e.preventDefault();
    this.setState({ editing:true });
  },
  updateTraining: function(data) {
    TrainingActions.updateTraining(data)
  },
  deleteTraining: function(e) {
    TrainingActions.destroyTraining(this.props.trainingOpportunity.id);
  }
});
