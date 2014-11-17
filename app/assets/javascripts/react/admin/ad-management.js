/**
 * @jsx React.DOM
 */
//= require react
//= require form-for
//= require actions/ad-actions
//= require react/admin/ad
//= require stores/ad-store

var AdManagement = React.createClass({displayName: 'AdManagement',
  getInitialState: function(){
    return {
      ads: [],
      errors: []
    }
  },
  componentDidMount: function() {
    AdStore.addChangeEvent(function() {
      if(this.isMounted()) this.setState({ ads: AdStore.ads(), errors: [] });
    }.bind(this))
    AdStore.addFailToTakeAction(function(e, errors) {
      if(this.isMounted()) this.setState({ errors: [errors] });
    }.bind(this))
    AdStore.all();
  },
  render: function(){
    var ads = [];
    this.state.ads.forEach(function (ad) {
      ads.push(React.createElement(Ad, {key: ad.id, ad: ad, errors: this.state.errors}))
    }.bind(this));
    return (
      React.createElement("div", {id: "admin-ad"}, 
      React.createElement("h1", null, "Create Ad"), 
        this.renderForm(), 
        ads
      )
    )
  },
  createAd: function(data) {
    AdActions.createAd(data)
  },
  renderForm: function() {
    var options={
      onSubmit: this.createAd,
      starts: {type: 'date'},
      ends: {type: 'date'}
    }
    return(React.createElement(FormFor, {object: AdStore.new(), options: options, errors: this.state.errors}))
  }
})
