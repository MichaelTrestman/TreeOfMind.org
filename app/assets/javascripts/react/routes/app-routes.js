/**
 * @jsx React.DOM
 */

//=require react
//= require router
//= require react/pub-inspect
//= require react/author-inspect
//= require react/list-browse-display



Router.routes = (function() {
  var _login = function() {
    React.unmountComponentAtNode($('.inside-body-content-container')[0]);
    React.render(React.createElement(LoginSignup, null), $('.inside-body-content-container')[0]);
  };

  var _about_us = function() {
    React.unmountComponentAtNode($(".inside-body-content-container")[0]);
    React.render( React.createElement(Page, {size: "single", url: window.location.href.split('#')[1]}), $(".inside-body-content-container")[0]);
  };
  var _contact_us = function() {
    React.unmountComponentAtNode($(".inside-body-content-container")[0]);
    React.render( React.createElement(Page, {size: "single", url: window.location.href.split('#')[1]}), $(".inside-body-content-container")[0]);
  };

  var _get_involved = function() {
    React.unmountComponentAtNode($(".inside-body-content-container")[0]);
    React.render( React.createElement(Page, {size: "single", url: window.location.href.split('#')[1]}), $(".inside-body-content-container")[0]);
  };

  var _donate = function() {
    React.unmountComponentAtNode($('.inside-body-content-container')[0]);
    React.render(React.createElement(DonationPurchaseForm, null), $('.inside-body-content-container')[0]);
  }
  var _publications = function(){
    React.unmountComponentAtNode($('.inside-body-content-container')[0]);
    React.render(React.createElement(ListBrowseDisplay, null), $('.inside-body-content-container')[0]);
  }
  var _list_publications = function(){
    React.unmountComponentAtNode(
        $('#listDisplay')[0]
      );
    React.render(
      React.createElement(ListBrowseDisplay, null), $('#listDisplay')[0]
    );

  }
  var _inspect_publication = function(){
    React.unmountComponentAtNode(
        $('#inspectDisplay')[0]
      );
    React.render(
      React.createElement(PubInspect, null), $('#inspectDisplay')[0]
    );
  }
  var _inspect_author = function(){
    React.unmountComponentAtNode(
      $('#inspectDisplay')[0]
    );
    React.render(
      React.createElement(AuthorInspect, null), $('#inspectDisplay')[0]
    );
  }

  return {
    "#login": _login,
    "#about-us": _about_us,
    "#contact-us": _contact_us,
    // '#publications': _publications
    '#list_publications': _list_publications,
    '#inspect_publication':
    _inspect_publication,
    '#inspect_author': _inspect_author
  }
}())

$(document).ready(function() {
  Router.route(window.location.hash)
})
$(window).on('hashchange', function() {
  Router.route(window.location.hash);
})
