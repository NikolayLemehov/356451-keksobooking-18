'use strict';

(function () {
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

  var getTransformYFromMatrix = function (matrix) {
    return Number(matrix.slice(matrix.lastIndexOf(', ') + 2, -1));
  };

  var addPinClickHandler = function (pin, pineIndex) {
    pin.addEventListener('click', function (evt) {
      evt.preventDefault();
      window.card.smartShowCard(pineIndex + 1);
    });
  };

  mapPinMainBtn.addEventListener('mousedown', function (evt) {
    if (!window.page.isActivePage) {
      window.page.activatePage();
      return;
    }
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY,
    };
    var width = mapPinMainBtn.offsetWidth;
    var height = Math.round(mapPinMainBtn.offsetHeight + pinUtils.getShiftFromBottomYMainPin());
    var moveMouseHandler = function (moveEvt) {
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
      if (top + height >= window.data.MIN_LOCATION_Y && top + height <= window.data.MAX_LOCATION_Y) {
        mapPinMainBtn.style.top = top + 'px';
        startCoords.y = moveEvt.clientY;
        window.pin.getAddressFromPinParameter();
      }
    };
    var upMouseHandler = function () {
      document.removeEventListener('mousemove', moveMouseHandler);
      document.removeEventListener('mouseup', upMouseHandler);
    };
    document.addEventListener('mousemove', moveMouseHandler);
    document.addEventListener('mouseup', upMouseHandler);
  });

  mapPinMainBtn.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.util.ENTER_KEY_CODE && !window.page.isActivePage) {
      window.page.activatePage();
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
    appendPinsFragment: function (dataArray) {
      var fragment = document.createDocumentFragment();
      for (var item = 0; item < dataArray.length; item++) {
        fragment.appendChild(renderPin(dataArray[item]));
      }
      pinsElement.appendChild(fragment);
    },
    addPinsClickHandler: function () {
      var pinElements = pinsElement.querySelectorAll('.map__pin:not(.map__pin--main)');
      for (var i = 0; i < pinElements.length; i++) {
        addPinClickHandler(pinElements[i], i);
      }
    },
    getAddressFromPinParameter: function () {
      window.form.adFormAddressInput.value = window.map.getCoordsElementOnMap(mapPinMainBtn).centerX + ', ' +
        pinUtils.getBottomYMainPin();
    },
  };
})();
