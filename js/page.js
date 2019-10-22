'use strict';

(function () {
  window.page = {
    booleanActive: false,
    data: [],
    actualData: [],
    getActualData: function (data) {
      return data.filter(function (it) {
        return !!it.offer;
      });
    },
    activate: function () {
      window.map.activate();
      window.form.activate();
      window.backend.load(window.success.onLoad, window.error.on);
      setTimeout(window.pin.getAddressFromElementParameter, 400);
      this.booleanActive = true;
    },
    deactivate: function () {
      window.map.deactivate();
      window.form.deactivate();
      window.pin.moveToStartCoordsMain();
      window.form.addressInput.value = window.map.getCoordsElementOnMap(window.pin.mainBtn).centerX + ', ' +
        window.map.getCoordsElementOnMap(window.pin.mainBtn).centerY;
      this.booleanActive = false;
    },
  };
})();
