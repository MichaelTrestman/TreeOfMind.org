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
          <div>
            <h3>editing form</h3>
            <FormFor object={ object }  options = { options } errors = { [] } />
          </div>
        )
      } else if (this.props.creating===true) {
        console.log('creating author!')
      } else if (!this.state.thisAuthor){
        return(
          <p> select a publication, researcher, or taxon to display info about it here </p>
        )
      } else {
        console.log('printing the thing')
        console.log(this.state.thisAuthor)
        var authy = this.state.thisAuthor
        return (
          <div>
            <h3>Name$$: {authy.first_name} {authy.last_name}</h3>
            <a href='#' onClick={this.editAuthor}>Edit | </a>
            <a href='#' onClick={this.delete}>delete</a>
            <div className='row'>
              <div className='col-lg-3 infoPanel'>
                <ul className='scrollyballz'>
                  <p className='tagName'>publications:</p>
                  {this.renderList(this.state.pubs)}
                </ul>
              </div>
            </div>
          </div>
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
            <li> { label }
            </li>
          )
        })
      };
    return tagList
  }
})