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
    var startGhostCoords = {
      x: evt.clientX,
      y: evt.clientY,
    };
    var width = mapPinMainBtn.offsetWidth;
    var height = Math.round(mapPinMainBtn.offsetHeight + pinUtils.getShiftFromBottomYMainPin());

    var ghostBtnOffsetLeft = mapPinMainBtn.offsetLeft;
    var ghostBtnOffsetTop = mapPinMainBtn.offsetTop;

    var left = mapPinMainBtn.offsetLeft;
    var ghostLeft = ghostBtnOffsetLeft;

    var top = mapPinMainBtn.offsetTop;
    var ghostTop = ghostBtnOffsetTop;

    var mapWidth = window.element.map.offsetWidth;
    var isBtnOnMap = function () {
      return (Math.round(ghostLeft + width / 2) >= 0) && (Math.round(ghostLeft + width / 2) <= mapWidth) &&
        (ghostTop + height >= window.data.LOCATION_Y.MIN) && (ghostTop + height <= window.data.LOCATION_Y.MAX);
    };
    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      var ghostShift = {
        x: moveEvt.clientX - startGhostCoords.x,
        y: moveEvt.clientY - startGhostCoords.y,
      };

      ghostLeft = ghostBtnOffsetLeft + ghostShift.x;
      ghostTop = ghostBtnOffsetTop + ghostShift.y;

      ghostBtnOffsetLeft = ghostLeft;
      ghostBtnOffsetTop = ghostTop;

      startGhostCoords.x = moveEvt.clientX;
      startGhostCoords.y = moveEvt.clientY;

      switch (true) {
        case (Math.round(ghostLeft + width / 2) < 0):
          mapPinMainBtn.style.left = (0 - width / 2) + 'px';
          break;
        case (Math.round(ghostLeft + width / 2) > mapWidth):
          mapPinMainBtn.style.left = (mapWidth - width / 2) + 'px';
          break;
      }

      switch (true) {
        case (ghostTop + height < window.data.LOCATION_Y.MIN):
          mapPinMainBtn.style.top = (window.data.LOCATION_Y.MIN - height) + 'px';
          break;
        case (ghostTop + height > window.data.LOCATION_Y.MAX):
          mapPinMainBtn.style.top = (window.data.LOCATION_Y.MAX - height) + 'px';
          break;
      }

      if (isBtnOnMap()) {
        var shift = {
          x: moveEvt.clientX - startCoords.x,
          y: moveEvt.clientY - startCoords.y,
        };
        left = mapPinMainBtn.offsetLeft + shift.x;
        top = mapPinMainBtn.offsetTop + shift.y;
        mapPinMainBtn.style.left = left + 'px';
        mapPinMainBtn.style.top = top + 'px';
        startCoords.x = moveEvt.clientX;
        startCoords.y = moveEvt.clientY;
      }
      getAddressFromPinParameter();
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
