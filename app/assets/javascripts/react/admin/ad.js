/**
 * @jsx React.DOM
 */
//= require react
//= require actions/ad-actions
//= require form-for

var Ad = React.createClass({displayName: 'Ad',
  getInitialState: function() {
    return {
      editing: false
    };
  },
  componentDidMount: function() {
    AdStore.addChangeEvent(function(data) {
      if(this.isMounted()) this.setState({ errors: [], editing: false})
    }.bind(this))
  },
  render: function() {
    var uploadBannerPath = '/images/new?imageable_type=Ad&imageable_id='+this.props.ad.id;
    return (
      React.createElement("div", {className: "ad"}, 
        React.createElement("div", {className: "panel panel-default"}, 
          React.createElement("div", {className: "panel-heading"}, 
            this.props.ad.organization, 
            React.createElement("a", {href: "#", onClick: this.editAd}, " edit |"), 
            React.createElement("a", {href: "#", onClick: this.deleteAd}, " delete |"), 
            React.createElement("a", {href: uploadBannerPath}, " upload/change banner")
          ), 
          this.state.editing ? this.renderEditForm() : this.renderAd()
        )

      )
    );
  },
  renderAd: function() {
    return(
      React.createElement("div", {className: "panel-body"}, 
        this.renderBanner(), 
        React.createElement("p", null, this.props.ad.url), 
        React.createElement("p", null, "Status: ", this.props.ad.active ? 'Active' : 'Not Active'), 
        React.createElement("p", null, "From: ", new Date(this.props.ad.starts).toDateString()), 
        React.createElement("p", null, "To: ", new Date(this.props.ad.ends).toDateString())
      )
    )
  },
  renderEditForm: function() {
    var options = {
      onSubmit: this.updateAd,
      starts: {type: 'date'},
      ends: {type: 'date'},
      image: {type: 'hidden'}
    }
    var object = $.extend(this.props.ad, {});
    object.starts = this.props.ad.starts.split('T')[0];
    object.ends = this.props.ad.starts.split('T')[0];
    return(React.createElement(FormFor, {object: object, options: options, errors: this.props.errors}))
  },
  renderBanner: function() {
    if(this.props.ad.image)
      return(React.createElement("img", {className: "banner", src: this.props.ad.image.url}));
  },
  deleteAd: function(e){
    e.preventDefault();
    AdActions.destroyAd(this.props.ad.id)
  },
  editAd: function(e) {
    e.preventDefault();
    if(this.isMounted()) this.setState({editing: !this.state.editing})
  },
  updateAd: function(data) {
    AdActions.updateAd(data);
  }
});
