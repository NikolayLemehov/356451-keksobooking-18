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
    deactivatePage: function () {
      window.map.deactivate();
      window.form.deactivate();
      window.pin.moveToStartCoordsPinMain();
      window.form.adFormAddressInput.value = window.map.getCoordsElementOnMap(window.pin.mapPinMainBtn).centerX + ', ' +
        window.map.getCoordsElementOnMap(window.pin.mapPinMainBtn).centerY;
      this.isActivePage = false;
    },
    onSuccess: function (dataArray) {
      window.pin.appendPinsFragment(dataArray);
      window.card.appendCardsFragment(dataArray);
      window.pin.addPinsClickHandler();
      window.card.addCloseBtnHandlers();
    },
  };
})();
