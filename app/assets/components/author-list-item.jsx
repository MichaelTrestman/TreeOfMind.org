/**
 * @jsx React.DOM
 */

//= require react
//= require actions/author-actions
//= require stores/authors-store

var AuthorListItem = React.createClass({

  render: function(){

    var thisAuthor = this.props.author
    return (
      <div className='list-group-item'>
        <a href='#' onClick={ this.displayAuthor}>
          <h4>first name: {thisAuthor.first_name} last name: {thisAuthor.last_name}</h4>
        </a>
      </div>
    )




  }


})