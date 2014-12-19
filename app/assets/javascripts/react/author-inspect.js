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
        React.createElement("div", null,
          React.createElement("h3", null, "editing form"),
          React.createElement(FormFor, {object: object, options: options, errors: [] })
        )
      )
    } else if (this.props.creating) {
      console.log('creation form (you need to write the logic)')
    } else if (!this.state.thisAuthor){
      return(
        React.createElement("p", null, " select a publication, researcher, or taxon to display info about it here ")
      )
    } else {

      var authy = this.state.thisAuthor
      console.log(this.state.pubs)
      return (
        React.createElement("div", null,
          React.createElement("h3", null, authy.last_name, ",", authy.first_name, " "),

          React.createElement("div", {className: "row"},
            React.createElement("div", {className: "col-lg-6 infoPanel"},
              React.createElement("ul", {id: "author-pubs-list", className: "scrollyballz"},
                React.createElement("p", {className: "tagName"}, "publications:"),
                this.renderList(this.state.pubs)
              )
            ),
            React.createElement("div", {className: "col-lg-6 infoPanel"},
              React.createElement("ul", {id: "author-coauthors-list", className: "scrollyballz"},
                React.createElement("p", {className: "tagName"}, "coauthors:"),
                 this.renderList(this.state.coauthors)
              )
            )
          )
        )
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
            React.createElement("li", {class: "list-group-item"},
            React.createElement(PubListItem, {key: tag.id, pub: tag, errors: []})
          )
          )
        } else if (tag.first_name){
          tagList.push(
            React.createElement(AuthorListItem, {key: tag.id, author: tag, errors: []})
          )
        }
      })
    };
    return tagList
  }
})
