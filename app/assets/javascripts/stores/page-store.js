//= require constants/apted-constants
//= require dispatchers/apted-dispatcher
//= stores/page-store

var PageStore = (function () {
  var _pages = [];
  var CHANGE_PAGE = 'change';
  var FAIL_TO_UPDATE_PAGE = "update-failed";
  var _pageData = {};
  return {
    newSection: function() {
      return {
        id: null,
        title: null,
        body: null,
        position: 0
      }
    },
    all: function() {
      $.ajax({
        url: '/admin/pages',
        type: 'GET'
      })
      .done(function (data) {
        _pages = data.pages;
        this.triggerChange();
      }.bind(this))
    },
    pages: function() {
      return _pages
    },
    pageData: function() {
      return _pageData
    },
    new: function () {
      return {
        title: null,
        abstract: null
      };
    },
    update: function (data) {
      $.ajax({
        url: '/admin/pages/' + data.id,
        type: 'PUT',
        data: {page: data}
      })
      .done(function (data) {
        _pageData = data.page;
        this.triggerChange();
      }.bind(this))
      .fail(function (xhr) {
        this.triggerFailToTakeAction([xhr.responseJSON.errors]);
      }.bind(this));
    },
    updateSection: function(data){
      $.ajax({
        url: '/admin/sections/' + data.id,
        type: 'PUT',
        data: {section: data}
      })
      .done(function(data){
        _pageData.sections.some(function(section, i) {
          if(data.section.id === section.id) return _pageData.sections[i] = data.section;
        });
        this.triggerChange();
      }.bind(this))
      .fail(function(xhr){
        this.triggerFailToTakeAction([xhr.responseJSON.errors]);
      }.bind(this))
    },
    createSection: function(data, page_id){
      $.ajax({
        url: '/admin/sections',
        type: 'POST',
        data: {section: data, page_id: page_id}
      })
      .done(function(data){
        _pageData.sections.push(data.section)
        this.triggerChange();
      }.bind(this))
      .fail(function(xhr){
        this.triggerFailToTakeAction([xhr.responseJSON.errors]);
      }.bind(this))
    },
    destroySection: function(id){
      $.ajax({
        url: '/admin/sections/'+id,
        type: 'DELETE'
      })
      .done(function(data){
        _pageData.sections.some(function(section, i) {
          if(data.section.id === section.id) _pageData.sections.splice(i, 1)[0];
        });
        this.triggerChange(data.section);
      }.bind(this))
      .fail(function(xhr){
        this.triggerFailToTakeAction([xhr.responseJSON.errors]);
      }.bind(this))
    },
    show: function(url){
      $.ajax({
        url: '/pages/'+url,
        type: 'GET'
      })
      .done(function (data) {
        _pageData = data.page
        this.triggerChange();
      }.bind(this))
    },
    addChangeEvent: function (callback) {
      $(this).on(CHANGE_PAGE, callback);
    },
    triggerChange: function (data) {
      $(this).trigger(CHANGE_PAGE, data);
    },
    addFailToTakeAction: function(callback) {
      $(this).on(FAIL_TO_UPDATE_PAGE, callback);
    },
    triggerFailToTakeAction: function(data) {
      $(this).trigger(FAIL_TO_UPDATE_PAGE, data);
    },
    payload: function (payload) {
      var action = payload.action;
      switch(action.type) {
        case AptedConstants.UPDATE_PAGE:
          this.update(action.data);
          break;
        case AptedConstants.CREATE_SECTION:
          this.createSection(action.data, action.page_id);
          break;
        case AptedConstants.UPDATE_SECTION:
          this.updateSection(action.data);
          break;
        case AptedConstants.DESTROY_SECTION:
          this.destroySection(action.id);
          break;
        default:
      }
    }
  }
}());

AptedDispatcher.register(PageStore.payload.bind(PageStore));
