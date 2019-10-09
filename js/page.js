'use strict';

(function () {
  window.page = {
    isActivePage: false,
    activatePage: function () {
      window.map.activateElement();
      window.form.activateElement();
      window.backend.load(this.onSuccessLoad, window.error.onError);
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
    onSuccessLoad: function (dataArray) {
      window.pin.appendPinsFragment(dataArray);
      window.card.appendCardsFragment(dataArray);
      window.pin.addPinsClick();
      window.card.onAddCloseBtnsClick();
    },
  };
})();
