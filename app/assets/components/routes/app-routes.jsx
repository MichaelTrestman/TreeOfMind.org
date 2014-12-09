
/**
 * @jsx React.DOM
 */

//=require react
//= require router
//= require react/pub-list-browse-display
//= require react/pub-inspect
//= require react/author-list-browse-display
//= require react/author-inspect
//= require react/taxa-list-browse-display

Router.routes = (function() {

  var _login = function() {
    React.unmountComponentAtNode($('.inside-body-content-container')[0]);
    React.render(<LoginSignup />, $('.inside-body-content-container')[0]);
  };

  var _about_us = function() {
    React.unmountComponentAtNode($(".inside-body-content-container")[0]);
    React.render( <Page size='single' url={window.location.href.split('#')[1]} />, $(".inside-body-content-container")[0]);
  };

  var _contact_us = function() {
    React.unmountComponentAtNode($(".inside-body-content-container")[0]);
    React.render( <Page size='single' url={window.location.href.split('#')[1]} />, $(".inside-body-content-container")[0]);
  };

  var _get_involved = function() {
    React.unmountComponentAtNode($(".inside-body-content-container")[0]);
    React.render( <Page size='single' url={window.location.href.split('#')[1]} />, $(".inside-body-content-container")[0]);
  };

  var _donate = function() {
    React.unmountComponentAtNode($('.inside-body-content-container')[0]);
    React.render(<DonationPurchaseForm />, $('.inside-body-content-container')[0]);
  }
  // var _publications = function(){
  //   React.unmountComponentAtNode($('.inside-body-content-container')[0]);
  //   React.render(<ListBrowseDisplay/>, $('.inside-body-content-container')[0]);
  // }
  var _list_publications = function(){
    React.unmountComponentAtNode(
        $('#listDisplay')[0]
      );
    React.render(
      <PubListBrowseDisplay/>, $('#listDisplay')[0]
    );
  }
  var _list_taxa = function(){
    React.unmountComponentAtNode(
        $('#listDisplay')[0]
    );
    React.render(
      <TaxonListBrowseDisplay/>, $('#listDisplay')[0]
    );
  }
  var _list_authors = function(){
    React.unmountComponentAtNode(
      $('#listDisplay')[0]
    );
    React.render(
      <AuthorListBrowseDisplay/>, $('#listDisplay')[0]
    );
  }

  var _inspect_taxon = function(){
    React.unmountComponentAtNode(
        $('#inspectDisplay')[0]
      );
    React.render(
      <TaxonInspect/>, $('#inspectDisplay')[0]
    );
  }
  var _new_taxon = function(){
    React.unmountComponentAtNode(
      $('#inspectDisplay')[0]
    );
    React.render(
      <TaxonInspect creating={ true }/>, $('#inspectDisplay')[0]
    );

  }
  var _inspect_publication = function(){
    React.unmountComponentAtNode(
        $('#inspectDisplay')[0]
      );
    React.render(
      <PubInspect/>, $('#inspectDisplay')[0]
    );
  }

  var _new_publication = function(){
    React.unmountComponentAtNode(
      $('#inspectDisplay')[0]
    );
    React.render(
      <PubInspect creating={ true }/>, $('#inspectDisplay')[0]
    );

  }
  var _new_author = function(){
    React.unmountComponentAtNode(
        $('#inspectDisplay')[0]
      );
    React.render(
      <AuthorInspect creating={true}/>, $('#inspectDisplay')[0]
    );
  }

  var _inspect_author = function(){
    React.unmountComponentAtNode(
      $('#inspectDisplay')[0]
    );
    React.render(
      <AuthorInspect/>, $('#inspectDisplay')[0]
    );
  }

  return {
    "#login": _login,
    "#about-us": _about_us,
    "#contact-us": _contact_us,
    // '#publications': _publications
    '#list_publications': _list_publications,
    '#inspect_publication': _inspect_publication,
    '#new_publication': _new_publication,
    '#list_authors': _list_authors,
    '#inspect_author': _inspect_author,
    '#new_author': _new_author,
    "#list_taxa": _list_taxa,
    "#inspect_taxon": _inspect_taxon,
    "#new_taxon": _new_taxon
  }
}())

$(document).ready(function() {
  Router.route(window.location.hash)
})
$(window).on('hashchange', function() {
  Router.route(window.location.hash);
})
