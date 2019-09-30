'use strict';

(function () {
  var pinsElement = window.element.map.querySelector('.map__pins');
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var mapPinMainBtn = document.querySelector('.map__pin--main');
  var pinMainStyle = getComputedStyle(mapPinMainBtn, ':after');

  var renderPin = function (data) {
    var adElement = pinTemplate.cloneNode(true);
    adElement.style.left = data.location.x + 'px';
    adElement.style.top = data.location.y + 'px';
    adElement.style.transform = 'translate(-50%, -100%)';
    adElement.querySelector('img').src = data.author.avatar;
    adElement.querySelector('img').alt = data.offer.title;
    return adElement;
  };

  var appendPinsFragment = function (dataArray) {
    var fragment = document.createDocumentFragment();
    for (var item = 0; item < dataArray.length; item++) {
      fragment.appendChild(renderPin(dataArray[item]));
    }
    pinsElement.appendChild(fragment);
  };

  var getTransformYFromMatrix = function (matrix) {
    return Number(matrix.slice(matrix.lastIndexOf(', ') + 2, -1));
  };

  appendPinsFragment(window.data.dataAds);

  var pinElements = pinsElement.querySelectorAll('.map__pin:not(.map__pin--main)');
  var addPinClickHandler = function (pin, pineIndex) {
    pin.addEventListener('click', function (evt) {
      evt.preventDefault();
      if (!window.card.isShowCard) {
        window.card.showPinCard(pineIndex + 1);
      }
      if (window.card.indexShowCard !== pineIndex + 1) {
        window.card.hidePinCard(window.card.indexShowCard);
        window.card.showPinCard(pineIndex + 1);
      }
    });
  };
  for (var i = 0; i < pinElements.length; i++) {
    addPinClickHandler(pinElements[i], i);
  }

  mapPinMainBtn.addEventListener('mousedown', function () {
    window.page.activatePage();
  });

  mapPinMainBtn.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.util.ENTER_KEY_CODE) {
      window.page.activatePage();
    }
  });

  window.pin = {
    // elements: pinsElement.querySelectorAll('.map__pin:not(.map__pin--main)'),
    mapPinMainBtn: mapPinMainBtn,
    getAddressFromPinParameter: function () {
      pinMainStyle = window.getComputedStyle(mapPinMainBtn, 'after');
      window.form.adFormAddressInput.value = window.map.getCoordsElementOnMap(mapPinMainBtn).centerX + ', ' +
        (window.map.getCoordsElementOnMap(mapPinMainBtn).bottomY +
          getTransformYFromMatrix(pinMainStyle.transform) +
          window.util.convertPixelToInteger(pinMainStyle.borderTopWidth));
    },
  };
})();
