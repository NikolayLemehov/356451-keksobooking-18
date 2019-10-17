'use strict';

(function () {
  var PIN_LIMIT = 5;
  var pinsElement = window.element.map.querySelector('.map__pins');
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var mapPinMainBtn = document.querySelector('.map__pin--main');
  var pinMainStyle = getComputedStyle(mapPinMainBtn, ':after');
  var pinUtils = {
    getShiftFromBottomYMainPin: function () {
      pinMainStyle = window.getComputedStyle(mapPinMainBtn, 'after');
      return getTransformYFromMatrix(pinMainStyle.transform) +
        window.util.convertPixelToInteger(pinMainStyle.borderTopWidth);
    },
    getBottomYMainPin: function () {
      return window.map.getCoordsElementOnMap(mapPinMainBtn).bottomY + this.getShiftFromBottomYMainPin();
    },
  };
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
    var takeNumber = dataArray.length > PIN_LIMIT ? PIN_LIMIT : dataArray.length;
    for (var item = 0; item < takeNumber; item++) {
      fragment.appendChild(renderPin(dataArray[item]));
    }
    window.pin.removePinElements();
    pinsElement.appendChild(fragment);
    window.filter.activate();
  };
  var addPinsClick = function () {
    var pinElements = pinsElement.querySelectorAll('.map__pin:not(.map__pin--main)');
    Array.from(pinElements).forEach(function (pin, pineIndex) {
      pin.addEventListener('click', function (evt) {
        evt.preventDefault();
        window.card.smartShowCard(pineIndex + 1);
      });
    });
  };

  var getTransformYFromMatrix = function (matrix) {
    return Number(matrix.slice(matrix.lastIndexOf(', ') + 2, -1));
  };

  mapPinMainBtn.addEventListener('mousedown', function (evt) {
    if (!window.page.booleanActive) {
      window.page.activate();
      return;
    }
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY,
    };
    var width = mapPinMainBtn.offsetWidth;
    var height = Math.round(mapPinMainBtn.offsetHeight + pinUtils.getShiftFromBottomYMainPin());
    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      var shift = {
        x: moveEvt.clientX - startCoords.x,
        y: moveEvt.clientY - startCoords.y,
      };
      var left = mapPinMainBtn.offsetLeft + shift.x;
      var top = mapPinMainBtn.offsetTop + shift.y;
      if (Math.round(left + width / 2) >= 0 && Math.round(left + width / 2) <= window.element.map.offsetWidth) {
        mapPinMainBtn.style.left = left + 'px';
        startCoords.x = moveEvt.clientX;
        window.pin.getAddressFromPinParameter();
      }
      if (top + height >= window.data.LOCATION_Y.MIN && top + height <= window.data.LOCATION_Y.MAX) {
        mapPinMainBtn.style.top = top + 'px';
        startCoords.y = moveEvt.clientY;
        window.pin.getAddressFromPinParameter();
      }
    };
    var onMouseUp = function () {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  mapPinMainBtn.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.util.KEY_CODE.ENTER && !window.page.booleanActive) {
      window.page.activate();
    }
  });

  var startCoordsPinMainLeft = '' + window.map.getCoordsElementOnMap(mapPinMainBtn).leftX + 'px';
  var startCoordsPinMainTop = '' + window.map.getCoordsElementOnMap(mapPinMainBtn).topY + 'px';

  window.pin = {
    mapPinMainBtn: mapPinMainBtn,
    moveToStartCoordsPinMain: function () {
      mapPinMainBtn.style.left = startCoordsPinMainLeft;
      mapPinMainBtn.style.top = startCoordsPinMainTop;
    },
    addPinsElement: function (dataArray) {
      appendPinsFragment(dataArray);
      addPinsClick();
      window.card.addCardsElement(dataArray);
    },
    getAddressFromPinParameter: function () {
      window.form.adFormAddressInput.value = window.map.getCoordsElementOnMap(mapPinMainBtn).centerX + ', ' +
        pinUtils.getBottomYMainPin();
    },
    removePinElements: function () {
      window.util.removeCollection(pinsElement.querySelectorAll('.map__pin:not(.map__pin--main)'));
    },
  };
})();
