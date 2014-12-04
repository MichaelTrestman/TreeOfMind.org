/**
 * @jsx React.DOM
 */
//= require react
//= require actions/publication-actions
//= require form-for
//= require stores/authors-store
//= react/author-list-item
//= require react/author-inspect

var AuthorListBrowseDisplay = React.createClass({displayName: 'AuthorListBrowseDisplay',
    getInitialState: function(){
      return {
        authors: [],
        query: null,
        errors: [],
        creatingNew: false
      }
    },
    componentDidMount: function(){
      AuthorsStore.addChangeEvent(function(){
        console.log('responding to authorslist change!')
        if(this.isMounted()) this.setState({
          authors: AuthorsStore.authors(),
          creatingNew: false
        });
      }.bind(this))
      AuthorsStore.addFailToTakeAction(function(e, data){
        if(this.isMounted()) this.setState({ errors: data })
      }.bind(this))
      AuthorsStore.all()
    },
    renderCreationFormButton: function(){
      return(
        React.createElement("a", {href: "#new_author"},
          "Create New Author Record"
        )
      )
    },
    renderCreationForm: function(){
      if(!this.state.creatingNew) return;
      var options={
        onSubmit: this.createAuthor
      }
      return (
        React.createElement(FormFor, {object:  AuthorsStore.newAuthor(), options: options, errors:  this.state.errors})
      )
    },
    toggleCreationForm: function(e){
      e.preventDefault();
      this.setState({
        creatingNew: !this.state.creatingNew
      })
    },
    createAuthor: function(data){
      AuthorsActions.createAuthor(data);
    },
    updateQuery: function(e){
      var query = e.target.value
      this.setState({ query: query })
      AuthorsStore.all(query)
    },

    render: function(){
      authors = [];
      if(this.state.authors){
        this.state.authors.forEach(
          function(author){
            var thisAuthor = author;
            authors.push(
              React.createElement("li", null,
                React.createElement(AuthorListItem, {key: thisAuthor.id, author: thisAuthor, errors: this.state.errors})
              )
            )
          }.bind(this)
        )
      };
      return(
        React.createElement("div", null,
          React.createElement("div", {className: "row"},
            React.createElement("div", {id: "authors-display"},
              React.createElement("a", {href: "#list_taxa"}, "Taxa  |"),
              React.createElement("a", {href: "#list_publications"}, "  Publications  |"),
              React.createElement("a", {href: "#list_topics"}, "  Topics"),
              React.createElement("h3", null, "Authors"),
              this.renderCreationFormButton(),
              React.createElement("div", null,
                "Search Query",
                React.createElement("input", {onChange: this.updateQuery, type: "text"})
              ),
              React.createElement("div", {className: "scrollyballz"},
                React.createElement("ul", {className: "list-group"},
                  authors
                )
              )
            )
          )
        )
      )
    }
})
