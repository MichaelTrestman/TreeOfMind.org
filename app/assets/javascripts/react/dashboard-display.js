/**
 * @jsx React.DOM
 */
//= require react
//= require actions/publication-actions
//= require form-for
//= require stores/publications-store
//= require react/pub-list-item
//= require react/pub-inspect

var DashboardDisplay = React.createClass({displayName: 'DashboardDisplay',
    getInitialState: function(){
      return{
        browsing: 'pubs',
        inspecting: null
      }
    },
    stuffToBrowse: {
      pubs: function(){
        return(
          React.createElement(PubsList, null)
        )
      },
      taxa: function(){
        return(
          React.createElement(TaxaList, null)
        )
      },
      authors: function(){
        return(
          React.createElement(AuthorsList, null)
        )
      },
      topics: function(){
        return(
          React.createElement(TopicsList, null)
        )
      }
    },
    thingToInspect: {
      pub: function(){
        return(
          React.createElement(PubInspect, null/)
        )
      },
      taxon: function(){
        return(
          React.createElement(TaxonInspect, null)
        )
      },
      author: function(){
        return(
          React.createElement(AuthorInspect, null)
        )
      }
    },

    render: function(){

      return(
        React.createElement("div", {className: "row"}, 
          React.createElement("h2", null, "Dashboard"), 
          React.createElement("div", {id: "browse-display"}, 
             stuffToBrowse[this.state.browsing]() 
          ), 
          React.createElement("div", {id: "inspect-display"}, 
             thingToInspect[this.state.inspecting]() 
          )

        )


      )
    }








})