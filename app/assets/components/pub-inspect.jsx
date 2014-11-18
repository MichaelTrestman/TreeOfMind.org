/**
 * @jsx React.DOM
 */

//= require react
//= require actions/publication-actions
//= require stores/publications-store

var PubInspect = React.createClass({
  getInitialState: function(){
    return {
      thisPub: null,
      editing: false,
      topics: [],
      taxa: []
    };
  },
  componentDidMount: function(){
    PublicationsStore.addChangeEvent(function(data){
      if(this.isMounted()) this.setState({
        editing:false,
        thisPub: PublicationsStore.activePub()
      });
    }.bind(this))
    PublicationsStore.addFailToTakeAction(function(e, data){
      if(this.isMounted()) this.setState({
        errors: data
      })
    }.bind(this));
  },
  editPub: function(e){
    e.preventDefault();
    this.setState({ editing: true })
  },

  updatePub: function(data){
    PublicationActions.updatePublication(data);
    this.setState({ editing: false })
  },
  render: function(){
    if (!this.state.thisPub){
      return (
        <p>select a publication, researcher, or taxon to display info about it here</p>
      )
    }
    if (this.state.editing){
      var options = {
        onSubmit: this.updatePub,
        abstract: {type: 'textarea'}
      }

      var object = this.state.thisPub;
      console.log(object)
      return (
        <FormFor object={ object } options = { options } errors = { [] } />
      )
    }
    return (
      <div>
        <h3>Title: {this.state.thisPub.title}</h3>
        <a href='#' onClick={this.editPub}>Edit | </a>
        <a href='#' onClick={this.delete}>delete</a>
        <p>Abstract: {this.state.thisPub.abstract}</p>
        <ul><h4>topics:</h4>
          {this.state.topics}
        </ul>
        <ul><h4>taxa:</h4>
          {this.state.taxa}
        </ul>
      </div>
    )

  }
})