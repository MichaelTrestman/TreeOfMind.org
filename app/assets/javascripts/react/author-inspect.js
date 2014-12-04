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
      if (this.props.creating){}else{
        AuthorsStore.addChangeEvent(function(data){
            if(this.isMounted()) this.setState({
                editing: false,
                thisAuthor: AuthorsStore.activeAuthor(),
                pubs: AuthorsStore.activeAuthorPubs()
            });
        }.bind(this))
        AuthorsStore.addFailToTakeAction(function(e, data){
          if(this.isMounted()) this.setState({
            errors: data
          })
        }.bind(this));
        AuthorsStore.display();
      }
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

      if (this.state.editing){
        var options = {
          onSubmit: this.updateAuthor
        }
        var auth = this.state.thisAuthor.author
        var object = {
          first_name: auth.first_name,
          last_name: auth.last_name
        };

        return (
          React.createElement("div", null,
            React.createElement("h3", null, "editing form"),
            React.createElement(FormFor, {object: object, options: options, errors: [] })
          )
        )
      } else if (this.props.creating===true) {
        console.log('creating author!')
      } else if (!this.state.thisAuthor){
        return(
          React.createElement("p", null, " select a publication, researcher, or taxon to display info about it here ")
        )
      } else {
        console.log('printing the thing')
        console.log(this.state.thisAuthor)
        var authy = this.state.thisAuthor
        return (
          React.createElement("div", null,
            React.createElement("h3", null, "Name$$: ", authy.first_name, " ", authy.last_name),
            React.createElement("a", {href: "#", onClick: this.editAuthor}, "Edit | "),
            React.createElement("a", {href: "#", onClick: this.delete}, "delete"),
            React.createElement("div", {className: "row"},
              React.createElement("div", {className: "col-lg-3 infoPanel"},
                React.createElement("ul", {className: "scrollyballz"},
                  React.createElement("p", {className: "tagName"}, "publications:"),
                  this.renderList(this.state.pubs)
                )
              )
            )
          )
        )
      }
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
