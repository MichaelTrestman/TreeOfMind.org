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
      <div className='list-group-item'>
        <a href='#' onClick={this.displayPub}>
          <h4>title: {thisPub.title}</h4>
          <p>{thisPub.abstract}</p>
        </a>
      </div>
    )
  },
  displayPub: function(){
    //set publication store currentPub to this publication... that will make the display update on the right
  },
  componentDidMount: function(){
  }
})
