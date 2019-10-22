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
      window.backend.load(window.success.onLoad, window.onError);
      setTimeout(window.pin.getAddressFromElementParameter, 400);
      this.booleanActive = true;
    },
    deactivate: function () {
      window.map.deactivate();
      window.form.deactivate();
      window.pin.moveToStartCoordsMain();
      window.form.addressInput.value = window.map.getCoordsPinOnElement(window.pin.mainBtn).centerX + ', ' +
        window.map.getCoordsPinOnElement(window.pin.mainBtn).centerY;
      this.booleanActive = false;
    },
  };
})();
