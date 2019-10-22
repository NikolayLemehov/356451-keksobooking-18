'use strict';

(function () {
  var PIN_LIMIT = 5;
  var pinsElement = window.element.map.querySelector('.map__pins');
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var mapPinMainBtn = document.querySelector('.map__pin--main');
  var pinMainStyle = getComputedStyle(mapPinMainBtn, ':after');
  var mapPinMainSvg = mapPinMainBtn.querySelector('svg');
  var pinUtils = {
    getShiftFromBottomYMainPin: function () {
      pinMainStyle = window.getComputedStyle(mapPinMainBtn, 'after');
      return getTransformYFromMatrix(pinMainStyle.transform) +
        window.util.convertPixelToInteger(pinMainStyle.borderTopWidth);
    },
    getBottomYMainPin: function () {
      return window.map.getCoordsPinOnElement(mapPinMainBtn).bottomY + this.getShiftFromBottomYMainPin();
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
    window.pin.removeElements();
    pinsElement.appendChild(fragment);
    window.filter.activate();
  };
  var addPinsClick = function () {
    var pinElements = pinsElement.querySelectorAll('.map__pin:not(.map__pin--main)');
    Array.from(pinElements).forEach(function (pin, pineIndex) {
      pin.addEventListener('click', function (evt) {
        evt.preventDefault();
        window.card.smartShow(pineIndex + 1);
      });
    });
  };

  var getAddressFromPinParameter = function () {
    window.form.addressInput.value = window.map.getCoordsPinOnElement(mapPinMainBtn).centerX + ', ' +
      pinUtils.getBottomYMainPin();
  };
  var getTransformYFromMatrix = function (matrix) {
    return Number(matrix.slice(matrix.lastIndexOf(', ') + 2, -1));
  };
  mapPinMainSvg.addEventListener('transitionend', function () {
    getAddressFromPinParameter();
  });
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
        getAddressFromPinParameter();
      }
      if (top + height >= window.data.LOCATION_Y.MIN && top + height <= window.data.LOCATION_Y.MAX) {
        mapPinMainBtn.style.top = top + 'px';
        startCoords.y = moveEvt.clientY;
        getAddressFromPinParameter();
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

  var startCoordsPinMainLeft = '' + window.map.getCoordsPinOnElement(mapPinMainBtn).leftX + 'px';
  var startCoordsPinMainTop = '' + window.map.getCoordsPinOnElement(mapPinMainBtn).topY + 'px';

  window.pin = {
    mainBtn: mapPinMainBtn,
    moveToStartCoordsMain: function () {
      mapPinMainBtn.style.left = startCoordsPinMainLeft;
      mapPinMainBtn.style.top = startCoordsPinMainTop;
    },
    addElements: function (dataArray) {
      appendPinsFragment(dataArray);
      addPinsClick();
      window.card.addElements(dataArray);
    },
    removeElements: function () {
      window.util.removeCollection(pinsElement.querySelectorAll('.map__pin:not(.map__pin--main)'));
    },
  };
})();
