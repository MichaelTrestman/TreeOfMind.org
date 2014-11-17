/** @jsx React.DOM */
//= require react
//= require form-for
//= require stores/training-store
//= require react/admin/training-opportunity

var TrainingOpportunities = React.createClass({displayName: 'TrainingOpportunities',
  getInitialState: function(){
    return {
      trainingOpportunities: [],
      errors: [],
      creating: false
    };
  },
  componentDidMount: function() {
   TrainingStore.addChangeEvent(function() {
      if(this.isMounted()) this.setState({ trainingOpportunities: TrainingStore.trainingOpportunities(), creating: false})
    }.bind(this))
    TrainingStore.addFailToTakeAction(function(data){
      if(this.isMounted()) this.setState({ errors: data});
    }.bind(this))
    TrainingStore.all();
  },
  render: function(){
    var trainingOpportunities = [];
    this.state.trainingOpportunities.forEach(function (trainOpp) {
      trainingOpportunities.push(React.createElement(TrainingOpportunity, {key: trainOpp.id, trainingOpportunity: trainOpp, errors: this.state.errors, admin: this.props.admin}))
    }.bind(this));

    return (
      React.createElement("div", {className: "training"}, 
        React.createElement("h2", null, "Training Opportunities"), 
        React.createElement("a", {href: "#", onClick: this.showForm}, "Create Training Opportunity"), 
        React.createElement("div", {className: "trainingForm"}, 
           this.renderTrainingCreateForm() 
        ), 
        trainingOpportunities
      )
    );
  },
  showForm: function(e) {
    e.preventDefault();
    this.setState({ creating: !this.state.creating });
  },
  renderTrainingCreateForm: function () {
    if (!this.props.admin || !this.state.creating) return;
    var options = {
      onSubmit: this.createTraining,
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
      React.createElement(FormFor, {object:  TrainingStore.new(), options: options, errors:  this.state.errors})
    )
  },
  createTraining: function(data) {
    TrainingActions.createTraining(data)
  }
})
