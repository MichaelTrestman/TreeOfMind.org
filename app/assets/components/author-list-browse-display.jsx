/**
 * @jsx React.DOM
 */
//= require react
//= require actions/publication-actions
//= require form-for
//= require stores/authors-store
//= react/author-list-item
//= require react/author-inspect

var AuthorListBrowseDisplay = React.createClass({
    getInitialState: function(){
      return {
        authors: [],
        query: null,
        errors: [],
        creatingNew: false
      }
    },
    renderCreationFormButton: function(){
      return(
        <a href='#' onCLick={this.toggleCreationForm}>
          {this.state.creatingNew ? "Back" : "Create New Author Record"}
        </a>
      )
    },
    renderCreationForm: function(){
      if(!this.state.creatingNew) return;
      var options={
        onSubmit: this.createAuthor
      }
      return (
        <FormFor object={ AuthorsStore.newAuthor() } options = { options } errors = { this.state.errors } />
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
    componentDidMount: function(){
      AuthorsStore.addChangeEvent(function(){
        if(this.isMounted()) this.setState({
          authors: AuthorsStore.authors(),
          creatingNew: false
        });
      }.bind(this))
      AuthorsStore.addFailToTakeAction(function(e, data){
        if(this.isMounted()) this.setState({ errors: data })
      }.bind(this))
      PublicationsStore.all()
    },
    render: function(){
      return(
        <div>shwaaaat??!</div>
      )
    }
})