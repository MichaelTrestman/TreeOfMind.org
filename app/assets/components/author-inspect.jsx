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
  // attachDragEventListeners: function(){
  //   this.pubsList = $('#author-pubs-list')
  //   $('#author-pubs-list')[0].addEventListener('dragover', this.handleDragOver, false);
  //   this.pubsList[0].addEventListener('dragenter', this.handleDragEnter)
  // },
  componentWillUpdate: function(){

  },
  componentDidMount: function(){

    AuthorsStore.addChangeEvent(function(data){

        if(this.isMounted()) this.setState({
            editing: false,
            thisAuthor: AuthorsStore.activeAuthor(),
            pubs: AuthorsStore.activeAuthorPubs(),
            coauthors: AuthorsStore.activeAuthorCoauthors()
        });

    }.bind(this))
    AuthorsStore.addFailToTakeAction(function(e, data){
      if(this.isMounted()) this.setState({
        errors: data
      })
    }.bind(this));
    AuthorsStore.display();

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
    } else if (this.props.creating) {
      console.log('creation form (you need to write the logic)')
    } else if (!this.state.thisAuthor){
      return(
        <p> select a publication, researcher, or taxon to display info about it here </p>
      )
    } else {

      var authy = this.state.thisAuthor
      console.log(this.state.pubs)
      return (
        <div>
          <h3>{authy.last_name},{authy.first_name} </h3>

          <div className='row'>
            <div className='col-lg-6 infoPanel'>
              <ul id="author-pubs-list" className='scrollyballz'>
                <p className='tagName'>publications:</p>
                {this.renderList(this.state.pubs)}
              </ul>
            </div>
            <div className='col-lg-6 infoPanel'>
              <ul id="author-coauthors-list" className='scrollyballz'>
                <p className='tagName'>coauthors:</p>
                { this.renderList(this.state.coauthors) }
              </ul>
            </div>
          </div>
        </div>
      )
    }
  },
  handleDragOver: function(e){
    if (e.preventDefault) {
      e.preventDefault();
    };
    e.dataTransfer.dropEffect = 'copy';
    return false;
  },
  renderList: function (tags) {
    var tagList = [];
    if (tags && tags.length > 0) {
      tags.forEach(function(tag){
        if(tag.title){
          tagList.push(
            <li class='list-group-item'>
            <PubListItem key={tag.id} pub={tag} errors={[]} />
          </li>
          )
        } else if (tag.first_name){
          tagList.push(
            <AuthorListItem key={tag.id} author={tag} errors={[]}/>
          )
        }
      })
    };
    return tagList
  }
})