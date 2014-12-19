/**
 * @jsx React.DOM
 */

//= require react
//= require actions/author-actions
//= require stores/authors-store

var AuthorListItem = React.createClass({displayName: 'AuthorListItem',

  render: function(){

    var thisAuthor = this.props.author
    return (
      React.createElement("div", {className: "list-group-item"},
        React.createElement("a", {href: "#", onClick:  this.displayAuthor},
          React.createElement("h4", null, thisAuthor.last_name, ", ", thisAuthor.first_name)
        )
      )
    )
  },

  displayAuthor: function(e){
    e.preventDefault();
    location.href='#inspect_author/' + this.props.author.id.toString();
  }
})
