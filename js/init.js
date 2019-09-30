'use strict';

(function () {
  window.map.init();
  window.form.init();
  window.form.adFormAddressInput.value = window.map.getCoordsElementOnMap(window.pin.mapPinMainBtn).centerX + ', ' +
    window.map.getCoordsElementOnMap(window.pin.mapPinMainBtn).centerY;
  document.querySelector('#title').removeAttribute('required');
})();
