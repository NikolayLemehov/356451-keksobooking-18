'use strict';

(function () {
  window.page = {
    isActivePage: false,
    activatePage: function () {
      window.map.activeElement();
      window.form.activeElement();
      setTimeout(window.pin.getAddressFromPinParameter, 400);
      this.isActivePage = true;
    },
    successHandler: function (dataArray) {
      window.pin.appendPinsFragment(dataArray);
      window.card.appendCardsFragment(dataArray);
      window.pin.addPinClickHandlers();
      window.card.addCloseBtnHandlers();
    },
  };
})();
