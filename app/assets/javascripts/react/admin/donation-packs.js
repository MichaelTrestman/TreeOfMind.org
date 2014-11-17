/**
 * @jsx React.DOM
 */
//= require react
//= require stores/pack-store

var DonPacks = React.createClass({displayName: 'DonPacks',
  getInitialState: function(){
    return{
      type: 'DonationPackage',
      errors: [],
      packs: [],
      creatingNew: false
    }
  },
  componentDidMount: function(){
    PackStore.addChangeEvent(function(){
      if(this.isMounted()) this.setState({
        packs: PackStore.donPacks(),
        creatingNew: false
      });
    }.bind(this))
    PackStore.addFailToTakeAction(function(e, data){
      if(this.isMounted()) this.setState({ errors: data })
    }.bind(this))
    PackStore.allDonPacks();
  },
  renderCreationFormButton: function(){
    return (React.createElement("a", {href: "#", onClick: this.toggleCreationForm}, 
    this.state.creatingNew ? "Back" : "Create New Donation Package"
      ))
  },
  renderCreationForm: function(){
    if(!this.state.creatingNew) return;
    var options = {
      onSubmit: this.createDonPack,
      description: { type: 'textarea'}
    }
    return (
      React.createElement(FormFor, {object:  PackStore.newDonPack(), options: options, errors:  this.state.errors})
    )
  },
  toggleCreationForm: function(e){
    e.preventDefault();
    this.setState({creatingNew: !this.state.creatingNew})
  },
  createDonPack: function(data){
    data.type = this.state.type
    PackActions.createPack(data);
  },
  render: function(){
    var packs = [];
    if(this.state.packs){
      this.state.packs.forEach(function(pack){
        packs.push(
          React.createElement(Pack, {key: pack.id, pack: pack, type: this.state.type, errors: this.state.errors})
        )
      }.bind(this));
      return(
        React.createElement("div", null, 
          React.createElement("h2", null, "Donation Packages"), 
          this.renderCreationFormButton(), 
          this.renderCreationForm(), 
          packs
        )
      )
    }
  }
})
