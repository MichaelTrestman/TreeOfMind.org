/**
 * @jsx React.DOM
 */

//= require react
//= require actions/publication-actions
//= require stores/publications-store

var PubListItem = React.createClass({

  render: function  () {

    var thisPub = this.props.pub
    return (
      <div className='row'>
          <h4>title: {thisPub.title}</h4>
          <p>{thisPub.abstract}</p>
      </div>
    )
  },

  componentDidMount: function(){
  }
})
