'use strict';

(function () {
  window.map.init();
  window.form.init();
  window.backend.load(window.page.successHandler, window.error.errorHandler);
  window.form.adFormAddressInput.value = window.map.getCoordsElementOnMap(window.pin.mapPinMainBtn).centerX + ', ' +
    window.map.getCoordsElementOnMap(window.pin.mapPinMainBtn).centerY;
  document.querySelector('#title').removeAttribute('required');
  // window.map.activeElement();
  // window.form.activeElement();
})();
