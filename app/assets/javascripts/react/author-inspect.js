/**
 * @jsx React.DOM
 */

//= require react
//= require actions/author-actions
//= require stores/authors-store

var AuthorInspect = React.createClass({displayName: 'AuthorInspect',
    getInitialState: function(){
      return {
        thisAuthor: null,
        editing: false,
        pubs: []
      };
    },
    componentDidMount: function(){
      AuthorsStore.addChangeEvent(function(data){
          if(this.isMounted()) this.setState({
              editing: false,
              thisAuthor: AuthorsStore.activeAuthor(),
              pubs: AuthorsStore.activeAuthor().pubs
          });
      }.bind(this))
      AuthorsStore.addFailToTakeAction(function(e, data){
        if(this.isMounted()) this.setState({
          errors: data
        })
      })
    },
    editAuthor: function(e){
      e.preventDefault();
      this.setState({ editing: true })
    },
    updateAuthor: function(data){
      AuthorActions.updatePublication(data);
      this.setState({ editing: false })
    },
    render: function(){
      if (!this.state.thisAuth){
        return(
          React.createElement("p", null, " select a publication, researcher, or taxon to display info about it here ")
        )
      }
      if (this.state.editing){
        var options = {
          onSubmit: this.updateAuthor
        }
        var object = this.state.thisPub;

        return (
          React.createElement(FormFor, {object: object, options: options, errors: [] })
        )

      }
      return (
        React.createElement("div", null, 
          React.createElement("h3", null, "Name: ", this.state.thisAuthor.name), 
          React.createElement("a", {href: "#", onClick: this.editAuthor}, "Edit | "), 
          React.createElement("a", {href: "#", onClick: this.delete}, "delete"), 
          React.createElement("div", {className: "row"}, 
            React.createElement("div", {className: "col-lg-3 infoPanel"}, 
              React.createElement("ul", {className: "scrollyballz"}, 
                React.createElement("p", {className: "tagName"}, "publications:"), 
                this.renderList(this.state.thisAuthor.pubs)
              )
            )
          )
        )
      )
    },
    renderList: function (tags) {
    console.log(tags)
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
          React.createElement("li", null, " ", label 
          )
        )
      })
    };
    return tagList
  }
})