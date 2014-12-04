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
        <a href='#new_author'>
          Create New Author Record
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

    render: function(){
      authors = [];
      if(this.state.authors){
        this.state.authors.forEach(
          function(author){
            var thisAuthor = author;
            authors.push(
              <li>
                <AuthorListItem key={thisAuthor.id} author={thisAuthor} errors={this.state.errors}/>
              </li>
            )
          }.bind(this)
        )
      };
      return(
        <div>
          <div className='row'>
            <div id='authors-display'>
              <a href='#list_taxa'>Taxa  |</a>
              <a href='#list_publications'>  Publications  |</a>
              <a href='#list_topics'>  Topics</a>
              <h3>Authors</h3>
              {this.renderCreationFormButton()}
              <div>
                Search Query
                <input onChange={this.updateQuery} type='text' ></input>
              </div>
              <div className='scrollyballz'>
                <ul className='list-group'>
                  {authors}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )
    }
})