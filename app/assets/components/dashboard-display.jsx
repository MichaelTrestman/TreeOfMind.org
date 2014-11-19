/**
 * @jsx React.DOM
 */
//= require react
//= require actions/publication-actions
//= require form-for
//= require stores/publications-store
//= require react/pub-list-item
//= require react/pub-inspect

var DashboardDisplay = React.createClass({
    getInitialState: function(){
      return{
        browsing: 'pubs',
        inspecting: null
      }
    },
    stuffToBrowse: {
      pubs: function(){
        return(
          <PubsList />
        )
      },
      taxa: function(){
        return(
          <TaxaList />
        )
      },
      authors: function(){
        return(
          <AuthorsList />
        )
      },
      topics: function(){
        return(
          <TopicsList />
        )
      }
    },
    thingToInspect: {
      pub: function(){
        return(
          <PubInspect/ >
        )
      },
      taxon: function(){
        return(
          <TaxonInspect />
        )
      },
      author: function(){
        return(
          <AuthorInspect />
        )
      }
    },

    render: function(){

      return(
        <div className='row'>
          <h2>Dashboard</h2>
          <div id='browse-display'>
            { stuffToBrowse[this.state.browsing]() }
          </div>
          <div id='inspect-display'>
            { thingToInspect[this.state.inspecting]() }
          </div>

        </div>


      )
    }








})