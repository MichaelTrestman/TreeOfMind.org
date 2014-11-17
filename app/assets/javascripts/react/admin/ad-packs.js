/**
 * @jsx React.DOM
 */
//= require react
//= require stores/pack-store
//= require react/admin/pack

var AdPacks = React.createClass({displayName: 'AdPacks',
  getInitialState: function(){
    return{
      type: 'AdvertisingPackage',
      errors: [],
      packs: [],
      creatingNew: false
    }
  },
  componentDidMount: function(){
    PackStore.addChangeEvent(function(){
      if(this.isMounted()) this.setState({
        packs: PackStore.adPacks(),
        creatingNew: false
      });
    }.bind(this))
    PackStore.addFailToTakeAction(function(e, data) {
      if(this.isMounted()) this.setState({ errors: data })
    }.bind(this))
    PackStore.allAdPacks();
  },
  renderCreationFormButton: function(){
    return (React.createElement("a", {href: "#", onClick: this.toggleCreationForm}, 
      this.state.creatingNew ? "Back" : "Create New Advertising Package"
      ))
  },
  renderCreationForm: function(){
    if(!this.state.creatingNew) return;
    var options = {
      onSubmit: this.createAdPack,
      duration_type: { type: 'select', values: [{value: "Days", show: "Days"}, {value: "Weeks", show: "Weeks"}, {value: "Months", show: "Months"}] },
      description: { type: 'textarea' }
    }
    return (
      React.createElement(FormFor, {object: PackStore.newAdPack(), options: options, errors: this.state.errors})
    )
  },
  toggleCreationForm: function(e) {
    e.preventDefault();
    this.setState({creatingNew: !this.state.creatingNew})
  },
  createAdPack: function(data){
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
    }
    return(
      React.createElement("div", null, 
        React.createElement("h2", null, "Advertising Packages"), 
        this.renderCreationFormButton(), 
        this.renderCreationForm(), 
        packs
      )
    )
  }
})


