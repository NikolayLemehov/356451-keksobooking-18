'use strict';

(function () {
  window.page = {
    booleanActive: false,
    data: [],
    activate: function () {
      window.map.activate();
      window.form.activate();
      window.backend.load(this.onSuccessLoad, window.error.onError);
      setTimeout(window.pin.getAddressFromPinParameter, 400);
      this.booleanActive = true;
    },
    deactivate: function () {
      window.map.deactivate();
      window.form.deactivate();
      window.pin.moveToStartCoordsPinMain();
      window.form.adFormAddressInput.value = window.map.getCoordsElementOnMap(window.pin.mapPinMainBtn).centerX + ', ' +
        window.map.getCoordsElementOnMap(window.pin.mapPinMainBtn).centerY;
      this.booleanActive = false;
    },
    onSuccessLoad: function (data) {
      window.page.data = data;
      window.filter.updateAds();
    },
  };
})();
