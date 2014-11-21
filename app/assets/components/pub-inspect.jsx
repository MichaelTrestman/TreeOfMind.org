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
      taxa: [],
      authors: [],
      references: []
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
    PublicationsStore.display();
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
    console.log(this.state.thisPub.topics)
    return (
      <div>
        <h3>Title: {this.state.thisPub.title}</h3>
        <a href='#' onClick={this.editPub}>Edit | </a>
        <a href='#' onClick={this.delete}>delete</a>
        <p>Abstract: {this.state.thisPub.abstract}</p>
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
              {this.renderList(this.state.taxa)}
            </ul>
          </div>
          <div className='col-lg-3 infoPanel'>
            <ul>
              <p className='tagName'>authors:</p>
              {this.renderList(this.state.authors)}
            </ul>
          </div>
          <div className='col-lg-3 infoPanel'>
            <ul>
              <p className='tagName'>references:</p>
              {this.renderList(this.state.references)}
            </ul>
          </div>
        </div>


      </div>
    )
  },
  renderList: function (tags) {
    console.log(tags)
    var tagList = [];
    if (tags && tags.length > 1) {
       console.log('constructing taglist')

      tags.forEach(function(tag){
        var label
        if(tag.title){ label = tag.title } else if (tag.name){ label = tag.name }
          console.log('tag:')
          console.log(tag)
        tagList.push(
          <li> { label }
          </li>
        )

      })

    };
        console.log('tagList')
        console.log(tagList)
    return tagList
  }
})