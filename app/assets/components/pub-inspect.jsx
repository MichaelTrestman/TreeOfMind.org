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
      // creating: false,
      topics: [],
      taxa: [],
      authors: [],
      references: []
    };
  },
  componentDidMount: function(){
    if (this.props.creating){
      console.log('yooooo')

    }else{
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
      PublicationsStore.display();
    }
  },
  editPub: function(e){
    e.preventDefault();
    this.setState({ editing: true })
  },
  updatePub: function(data){
    console.log('sending updatePub action')
    PublicationActions.updatePublication(data);
    this.setState({ editing: false })
  },
  createPub: function(data){
    console.log('sending createPub action');
    PublicationActions.createPublication(data)
  },
  render: function(){

    if (this.state.editing){
      var options = {
        onSubmit: this.updatePub,
        abstract: {type: 'textarea'}
      }
      var object = this.state.thisPub;

      return (
        <div>
          <h3>editing form!!</h3>
          <FormFor object={ object } options = { options } errors = { [] } />
        </div>
      )
    } else if (this.props.creating) {
      var options = {
        onSubmit: this.createPub,
        abstract: { type: 'textarea' }
      }
      var object =  PublicationsStore.newPublication()
      return (
        <div>
          <h3>creation form!</h3>
          <FormFor object={object} options = {options} errors = {[]}/>
        </div>
      )
    } else if (!this.state.thisPub){
      return (
        <p>select a publication, researcher, or taxon to display info about it here</p>
      )
    }
    return (
      <div>
        <h3>Title: {
          this.state.thisPub.publication ? this.state.thisPub.publication.title : 'none selected'
        }</h3>
        <a href='#' onClick={this.editPub}>Edit | </a>
        <a href='#' onClick={this.delete}>delete</a>
        <p>Abstract: {this.state.thisPub.publication ? this.state.thisPub.publication.abstract : 'none selected'}</p>
        <div className='row'>
          <div className='col-lg-3 infoPanel'>
            <ul className='scrollyballz'>
              <p className='tagName'>topics:</p>
              {this.renderList(this.state.thisPub.topics)}
            </ul>
          </div>
          <div className='col-lg-3 infoPanel'>
            <ul>
              <p className='tagName'>taxa:</p>
              {this.renderList(this.state.thisPub.taxa)}
            </ul>
          </div>
          <div className='col-lg-3 infoPanel'>
            <ul>
              <p className='tagName'>authors:</p>
              {this.renderList(this.state.thisPub.authors)}
            </ul>
          </div>
          <div className='col-lg-3 infoPanel'>
            <ul>
              <p className='tagName'>references:</p>
              {this.renderList(this.state.thisPub.references)}
            </ul>
          </div>
        </div>


      </div>
    )
  },

  renderList: function (tags) {
    var tagList = [];
    if (tags && tags.length > 0) {

      tags.forEach(function(tag){
        var label
        if(tag.title){
          label = "title" + tag.title
        } else if (tag.first_name){
          label = tag.first_name + " " + tag.last_name
        }
        tagList.push(
          <li> { label }
          </li>
        )
      })
    };
    return tagList
  }
})