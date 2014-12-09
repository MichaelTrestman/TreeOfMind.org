/**
 * @jsx React.DOM
 */

//= require react
//= require actions/taxon-actions
//= require stores/taxa-store

var TaxonInspect = React.createClass({
  getInitialState: function(){
    return {
      thisTaxon: null,
      editing: false,
      superTaxon: null,
      publications: [],
      topics: [],
      subtaxa: []
    };
  },
  componentDidMount: function(){
    console.log('taxon component did mounting')
    TaxaStore.addChangeEvent(
      function(data){
        console.log('yo!')
        if(this.isMounted()) this.setState({
          editing: false,
          thisTaxon: TaxaStore.activeTaxon(),
          superTaxon: TaxaStore.activeTaxonSuperTaxon(),
          subtaxa: TaxaStore.activeTaxonSubtaxa()
        });
      }.bind(this))
    TaxaStore.addFailToTakeAction(function(e, data){
      if(this.isMOunted()) this.setState({
        errors: data
      })
    }.bind(this));
    TaxaStore.display();
  },
  renderList: function (tags) {
    var tagList = [];
    if (tags && tags.length > 0) {
      tags.forEach(function(tag){
        if(tag.title){
          tagList.push(
            <li class='list-group-item'>
            <PubListItem key={tag.id} pub={tag} errors={[]} />
          </li>
          )
        } else if (tag.first_name){
          tagList.push(
            <AuthorListItem key={tag.id} author={tag} errors={[]}/>
          )
        } else if (tag.name){
          tagList.push(
            <TaxonListItem key={tag.id} taxon={tag} errors = {[]}/>
          )
        }
      })
    };
    return tagList
  },
  render: function(){

    console.log('trying to render :/')
    if (this.state.editing) {
      var options = {
        onSubmit: this.updateTaxon
      }
      var object = {
        title: this.state.thisTaxon.taxon.title
      };
      console.log(this.state)
      return (<div></div>)
    } else if (this.props.creating) {
      console.log("creating!!!")
      return (<div></div>)
    } else if (!this.state.thisTaxon) {
      console.log('no current taxon!')
      return (<div>select a taxon</div>)
    }
    else {
      thisTaxon = this.state.thisTaxon
      return (
        <div>
          <h3>Name: { thisTaxon.name }</h3>
          <h4>Supertaxon: { this.state.superTaxon }</h4>
          <button onClick={this.editPub}>Edit</button>
          <button onClick={this.deletePub}> Delete </button>
          <div className='row'>
            <div className='col-lg-3 infoPanel'>
              <ul className='scrollyballz'>
                <p className='tagName'>subtaxa: </p>
                {this.state.subtaxa ? this.renderList(this.state.subtaxa) : 'no stupid subtaxa'}
              </ul>
            </div>
            <div className='col-lg-3 infoPanel'>
              <ul>
                <p className='tagName'>references:</p>
                {this.renderList(this.state.thisTaxon.publications)}
              </ul>
            </div>
            <div className='col-lg-3 infoPanel'>
              <ul>
                <p className='tagName'>topics:</p>
                {this.renderList(this.state.thisTaxon.topics)}
              </ul>
            </div>
          </div>
        </div>
      )
    };
  }
})