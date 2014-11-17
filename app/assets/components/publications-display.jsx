/**
 * @jsx React.DOM
 */
//= require react
//= require actions/publication-actions
//= require form-for
//= require stores/publications-store
//= require react/pub-list-item


var PublicationsDisplay = React.createClass({
  getInitialState: function(){
    return {
      pubs: [],
      query: null,
      creatingNew: false,
      errors: []
    }
  },
  componentDidMount: function(){
    PublicationsStore.addChangeEvent(function(){
      if(this.isMounted()) this.setState({
        publications: PublicationsStore.publications(),
        creatingNew: false
      });
    }.bind(this))
    PublicationsStore.addFailToTakeAction(function(e, data){
      if(this.isMounted()) this.setState({ errors: data })
    }.bind(this))
    PublicationsStore.all()
  },

  renderCreationFormButton: function(){
    return(
      <a href="#" onCLick={this.toggleCreationForm}>
        {this.state.creatingNew ? "Back" : "Create New Publication Record"}
      </a>
    )
  },

  renderCreationForm: function(){
    if(!this.state.creatingNew) return;
    var options ={
      onSubmit: this.createPublication,
      abstract: { type: 'textarea'}
    }
    return (
      <FormFor object={ PublicationsStore.newPublication() } options = { options } errors = { this.state.errors } />
    )
  },
  toggleCreationForm: function(e){
    e.preventDefault();
    this.setState({creatingNew: !this.state.creatingNew})
  },
  createPublication: function(data){
    PublicationActions.createPublication(data);
  },
  render: function(){

    publications = [];
    if(this.state.publications){
      this.state.publications.forEach(function(pub){
        var thisPub = pub;
        publications.push(
          <li class='list-group-item'>
            <PubListItem key={thisPub.id} pub={thisPub} errors={this.state.errors} />
          </li>
        )
      }.bind(this));
    }

    return(
      <div id='publications-panel' class='row'>
        <div class='col-md-pull-4'>
          <h2>Publication Records</h2>
          {this.renderCreationFormButton()}
          <ul class='list-group'>
            {publications}
          </ul>
        </div>
        <div class='col-md-4 col-md-push-4'>
          <h2>something else</h2>

        </div>
      </div>
    )
  }
})

// var PublicationsDisplay = React.createClass({displayName: 'PublicationsDisplay',
//   getInitialState: function(){
//     return {
//       pubs: [],
//       query: null,
//       creatingNew: false,
//       errors: []
//     }
//   },
//   componentDidMount: function(){
//     PublicationsStore.addChangeEvent(function(){
//       if(this.isMounted()) this.setState({
//         publications: PublicationsStore.pubs(),
//         creatingNew: false
//       });
//     }.bind(this))
//     PublicationsStore.addFailToTakeAction(function(e, data){
//       if(this.isMounted()) this.setState({ errors: data })
//     }.bind(this))
//     PublicationsStore.all()
//   },
//   renderCreationFormButton: function(){
//     return(
//       React.createElement("a", {href: "#", onCLick: this.toggleCreationForm},
//         this.state.creatingNew ? "Back" : "Create New Publication Record"
//       )
//     )
//   },

//   renderCreationForm: function(){
//     if(!this.state.creatingNew) return;
//     var options ={
//       onSubmit: this.createPublication,
//       abstract: { type: 'textarea'}
//     }
//     return (
//       React.createElement(FormFor, {object:  PublicationsStore.newPublication(), options: options, errors:  this.state.errors})
//     )
//   },
//   toggleCreationForm: function(e){
//     e.preventDefault();
//     this.setState({creatingNew: !this.state.creatingNew})
//   },
//   createPublication: function(data){
//     PublicationActions.createPublication(data);
//   },
//   render: function(){
//     console.log('rendering dawg')
//     publications = [];
//     if(this.state.publications){
//       this.state.publications.forEach(function(pub){
//         var thisPub = pub.pub;
//         publications.push(
//           React.createElement("li", null,
//             React.createElement(PubListItem, {key: thisPub.id, pub: thisPub, errors: this.state.errors})
//           )
//         )
//       }.bind(this));
//     }
//     return(
//       React.createElement("div", {id: "publication-panel"},
//         React.createElement("h2", null, "Publication Records"),
//         this.renderCreationFormButton(),
//         React.createElement("ul", null,
//           publications
//         )
//       )
//     )
//   }
// })