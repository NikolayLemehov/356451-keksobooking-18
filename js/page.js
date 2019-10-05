'use strict';

(function () {
  window.page = {
    isActivePage: false,
    activatePage: function () {
      window.map.activateElement();
      window.form.activateElement();
      setTimeout(window.pin.getAddressFromPinParameter, 400);
      this.isActivePage = true;
    },
    onSuccess: function (dataArray) {
      window.pin.appendPinsFragment(dataArray);
      window.card.appendCardsFragment(dataArray);
      window.pin.addPinsClickHandler();
      window.card.addCloseBtnHandlers();
    },
  };
})();
