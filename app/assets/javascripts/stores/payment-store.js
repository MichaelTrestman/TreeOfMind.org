//= require constants/apted-constants
//= require dispatchers/apted-dispatcher
//= require stores/session-store
//= require checkout
var PaymentStore = (function () {
  var CHANGE_EVENT = 'change';
  var FAIL_TO_CREATE_EVENT = 'creation-failed';

  return {
    addChangeEvent: function(callback) {
      $(this).on(CHANGE_EVENT, callback);
    },
    removeChangeEvent: function(obj) {
      $(this).off(CHANGE_EVENT, obj);
    },
    addFailToTakeAction: function(callback) {
      $(this).on(FAIL_TO_CREATE_EVENT, callback);
    },
    removeFailToTakeAction: function(obj) {
      $(this).off(FAIL_TO_CREATE_EVENT, obj);
    },
    triggerFailToTakeAction: function(data) {
      $(this).trigger(FAIL_TO_CREATE_EVENT, data);
    },
    triggerChange: function(data) {
      $(this).trigger(CHANGE_EVENT, data);
    },
    purchaseMembership: function (token, paymentInfo) {
      var authenticityToken = SessionStore.getAuthenticityToken();
      $.ajax({
        type: 'POST',
        url: '/memberships',
        data: { token: token, authenticity_token: authenticityToken, payment_info: paymentInfo }
      })
      .done(function (data) {
        console.log("success");
      })
      .fail(function (xhr) {
        console.log("fail");
      })
    },
    createPaymentForm: function (data) {
      var paymentInfo = {
        name: 'APTED',
        description: data.name + ' ($' + data.price/100 + ')',
        amount: data.price,
        subscription: data.name + data.description,
        subId: data.id,
        purchaseType: data.type
      };

      var handler = StripeCheckout.configure({
        key: 'pk_test_jEmBrS1hcaVnUlNRB3LqZoZz',
        image: '/assets/aptedsf_logo_1.png',
        token: function(token) {
          this.purchaseMembership(token, paymentInfo)
        }.bind(this)
      });
      handler.open(paymentInfo);
    },
    payload: function (payload) {
      var action = payload.action;
      switch(action.type) {
        case AptedConstants.CREATE_PAYMENT_FORM:
          this.createPaymentForm(action.data);
          break;
        default:
      }
    }
  };
}());
AptedDispatcher.register(PaymentStore.payload.bind(PaymentStore));
