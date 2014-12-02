/**
 * @jsx React.DOM
 */

//= require react
//= require actions/author-actions
//= require stores/authors-store

var AuthorInspect = React.createClass({
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
          <p> select a publication, researcher, or taxon to display info about it here </p>
        )
      }
      if (this.state.editing){
        var options = {
          onSubmit: this.updateAuthor
        }
        var object = this.state.thisPub;

        return (
          <FormFor object={ object }  options = { options } errors = { [] } />
        )

      }
      return (
        <div>
          <h3>Name: {this.state.thisAuthor.name}</h3>
          <a href='#' onClick={this.editAuthor}>Edit | </a>
          <a href='#' onClick={this.delete}>delete</a>
          <div className='row'>
            <div className='col-lg-3 infoPanel'>
              <ul className='scrollyballz'>
                <p className='tagName'>publications:</p>
                {this.renderList(this.state.thisAuthor.pubs)}
              </ul>
            </div>
          </div>
        </div>
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
          <li> { label }
          </li>
        )
      })
    };
    return tagList
  }
})