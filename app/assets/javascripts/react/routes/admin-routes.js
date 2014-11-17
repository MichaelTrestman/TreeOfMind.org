/**
 * @jsx React.DOM
 */
//= require router
//= require react/licenses
//= require react/events
//= require react/pages
//= require react/login-signup
//= require react/admin/individual-providers
//= require react/admin/programs
//= require react/admin/mailing-lists
//= require react/admin/slider-display
//= require react/admin/ad-management
//= require react/admin/ad-packs
//= require react/admin/mem-packs
//= require react/admin/donation-packs
//= require react/admin/social-links
//= require react/admin/donations
//= require react/admin/contact-page
//= require react/admin/get-involved-page
//= require react/admin/donations-page
//= require react/admin/training-opportunities
//= require react/admin/admin-attributes
//= require react/groups
//= require react/organizations
//= require react/tags

Router.routes = (function() {
  var unMount = function(){
    React.unmountComponentAtNode($("#main-page-content")[0]);
  }
  var mountIt = function(component){
    React.render(component, $("#main-page-content")[0]);
  }
  var _events = function() {
    unMount();
    mountIt(React.createElement(Events, {admin: true}))
  };
  var _pages = function(){
    unMount();
    mountIt(React.createElement(Pages, null))
  }
  var _individualProviders = function(){
    unMount();
   mountIt(React.createElement(IndividualProviders, null))
  }
  var _programs = function(){
    unMount();
    mountIt(React.createElement(Programs, null))
  }
  var _mailingLists = function(){
    unMount();
    mountIt(React.createElement(MailingLists, null))
  }
  var _sliderDisplay = function(){
    unMount();
    mountIt(React.createElement(SliderDisplay, null))
  }
  var _adManagement = function(){
    unMount();
    mountIt(React.createElement(AdManagement, null))
  }
  var _adPacks = function(){
    unMount();
    mountIt(React.createElement(AdPacks, null))
  }
  var _memPacks = function(){
    unMount();
    mountIt(React.createElement(MemPacks, null))
  }
  var _donPacks = function(){
    unMount();
    mountIt(React.createElement(DonPacks, null));
  }
  var _socialLinks = function(){
    unMount();
    mountIt(React.createElement(SocialLinks, null))
  }
   var _donations = function(){
    unMount();
    mountIt(React.createElement(Donations, null))
  }
  var _contactPage = function(){
    unMount();

    mountIt(React.createElement(Page, {key: 5, page: page, errors: this.state.errors}))
  }
  var _getInvolvedPage = function(){
    unMount();
    mountIt(React.createElement(GetInvolvedPage, null))
  }
  var _donationsPage = function(){
    unMount();
    mountIt(React.createElement(DonationsPage, null))
  }
  var _trainingOpportunities = function(){
    unMount();
    mountIt(React.createElement(TrainingOpportunities, {admin: true}))
  }
  var _adminAttributes = function(){
    unMount();
    mountIt(React.createElement(AdminAttributes, null))
  }
  var _organizations = function(){
    unMount();
    mountIt(React.createElement(Organizations, {admin: true}))
  }
  var _groups = function(){
    unMount();
    mountIt(React.createElement(Groups, {admin: SessionStore.isAdmin()}))
  }
  var _tags = function(){
    unMount();
    mountIt(React.createElement(Tags, {admin: SessionStore.isAdmin()}))
  }
  return {
    "#events": _events,
    '#individual-providers': _individualProviders,
    '#programs': _programs,
    '#mailingLists': _mailingLists,
    '#sliderDisplay': _sliderDisplay,
    '#ads': _adManagement,
    '#adPacks': _adPacks,
    '#donPacks': _donPacks,
    '#memPacks': _memPacks,
    '#socialLinks': _socialLinks,
    '#donations': _donations,
    '#contactPage': _contactPage,
    '#getInvolvedPage': _getInvolvedPage,
    '#donationsPage': _donationsPage,
    '#pages': _pages,
    '#trainingOpportunities': _trainingOpportunities,
    "#attributes": _adminAttributes,
    '#organizations': _organizations,
    '#groups': _groups,
    '#tags': _tags
  }
}())

$(document).ready(function() {
  Router.route(window.location.hash)
})
$(window).on('hashchange', function() {
  Router.route(window.location.hash);
})
