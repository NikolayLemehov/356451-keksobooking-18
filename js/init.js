'use strict';

(function () {
  var successHandler = function (dataArray) {
    window.pin.appendPinsFragment(dataArray);
    window.card.appendCardsFragment(dataArray);
    window.pin.addPinClickHandlers();
  };

  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = '0';
    node.style.right = '0';
    node.style.fontSize = '30px';
    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };


  window.map.init();
  window.form.init();
  window.backend.load(successHandler, errorHandler);
  window.form.adFormAddressInput.value = window.map.getCoordsElementOnMap(window.pin.mapPinMainBtn).centerX + ', ' +
    window.map.getCoordsElementOnMap(window.pin.mapPinMainBtn).centerY;
})();
