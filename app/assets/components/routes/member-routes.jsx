/**
 * @jsx React.DOM
 */
//= require router
//= require react/personal-information
//= require react/member-addresses
//= require react/licenses
//= require react/links
//= require react/contacts
//= require react/member-attributes
//= require react/directors
//= require react/descriptions
//= require react/staffs
//= require react/phones
//= require react/categories
//= require react/credentials

//= require react/tag

Router.routes = (function() {
  var unMount = function(){
    React.unmountComponentAtNode($("#main-page-content")[0]);
  }
  var mountIt = function(component){
    React.render(component, $("#main-page-content")[0]);
  }

  var _personal_info = function() {
    unMount();
    mountIt(<PersonalInformation/>)
  }
  var _addresses = function() {
    unMount();
    mountIt(<MemberAddresses />)
  }
  var _licenses = function() {
    unMount();
    mountIt(<Licenses/>)
  }
  var _links = function() {
    unMount();
    mountIt(<Links linkable_type={SessionStore.currentUser.type} linkable_id={SessionStore.currentUser.id} />)
  }
  var _contacts = function() {
    unMount();
    mountIt(<Contacts contactable_type={SessionStore.currentUser.type} contactable_id={SessionStore.currentUser.id} />)
  }
  var _levelsOfCare = function() {
    unMount();
    mountIt(<MemberAttributes attributeCategory='Levels of Care Treated' />)
  }
  var _populations = function() {
    unMount();
    mountIt(<MemberAttributes attributeCategory='Eating Disorder Populations Treated' />)
  }
  var _insurances = function() {
    unMount();
    mountIt(<MemberAttributes attributeCategory='Insurance Plans Accepted' />)
  }
  var _directors = function() {
    unMount();
    mountIt(<Directors/>)
  }
  var _descriptions = function() {
    unMount();
    mountIt(<Descriptions/>)
  }
  var _staffs = function() {
    unMount();
    mountIt(<Staffs staffable_type={SessionStore.currentUser.type} staffable_id={SessionStore.currentUser.id}/>)
  }
  var _phones = function() {
    unMount();
    mountIt(<Phones phoneable_type={SessionStore.currentUser.type} phoneable_id={SessionStore.currentUser.id} />)
  }
  var _psychotherapist = function() {
    unMount();
    mountIt(<MemberAttributes attributeCategory='Psychotherapist' />)
  }
  var _psychiatrist = function() {
    unMount();
    mountIt(<MemberAttributes attributeCategory='Psychologist' />)
  }
  var _nutritionistsDietitians = function() {
    unMount();
    mountIt(<MemberAttributes attributeCategory='Nutritionists, Dietitians' />)
  }
  var _physiciansOtherMedical = function() {
    unMount();
    mountIt(<MemberAttributes attributeCategory="Physicians and Other Medical" />)
  }
  var _dentist = function() {
    unMount();
    mountIt(<MemberAttributes attributeCategory='Dentist' />)
  }
  var _backgroundOther = function() {
    unMount();
    mountIt(<MemberAttributes attributeCategory='Other' />)
  }
  var _backgroundGeneralCredentials = function() {
    unMount();
    mountIt(<MemberAttributes attributeCategory='General Credentials' />)
  }
  var _categories = function() {
    unMount();
    mountIt(<Categories/>)
  }
  var _credentials = function() {
    unMount();
    mountIt(<Credentials/>)
  }
  var _modalities = function() {
    unMount();
    mountIt(<MemberAttributes attributeCategory='Modalities Utilized' />)
  }
  var _coOccurringSpecialties = function() {
    unMount();
    mountIt(<MemberAttributes attributeCategory='Co-Occurring and Other Clinical Specialties' />)
  }
  var _languages = function() {
    unMount();
    mountIt(<MemberAttributes attributeCategory='Languages' />)
  }
  var _treatmentApproaches = function() {
    unMount();
    mountIt(<MemberAttributes attributeCategory='Treatment Approaches' />)
  }
  _redirect = function() {
    window.location = '#personal-information'
  }
  return {
    '': _redirect,
    '#personal-information': _personal_info,
    '#addresses': _addresses,
    '#licenses': _licenses,
    '#links': _links,
    '#contacts': _contacts,
    '#levels-of-care': _levelsOfCare,
    '#populations': _populations,
    '#insurances': _insurances,
    '#directors': _directors,
    '#descriptions': _descriptions,
    '#staffs': _staffs,
    '#phones': _phones,
    '#categories': _categories,
    '#credentials': _credentials,
    '#modalities': _modalities,
    '#co-occuring-specialties': _coOccurringSpecialties,
    '#languages': _languages,
    '#treatment-approaches': _treatmentApproaches,
    "#background-psychotherapist": _psychotherapist,
    "#background-psychiatrist": _psychiatrist,
    "#background-nutritionists-dietitians": _nutritionistsDietitians,
    "#background-physicians-other-medical": _physiciansOtherMedical,
    "#background-dentist": _dentist,
    "#background-other": _backgroundOther,
    "#background-general-credentials": _backgroundGeneralCredentials
  }
}())

$(document).ready(function() {
  Router.route(window.location.hash)
})
$(window).on('hashchange', function() {
  Router.route(window.location.hash);
})
