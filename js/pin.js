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
    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      var shift = {
        x: null,
        y: null,
      };
      var moveInMap = {
        x: function () {
          shift.x = moveEvt.clientX - startCoords.x;
          left = mapPinMainBtn.offsetLeft + shift.x;
          mapPinMainBtn.style.left = left + 'px';
          startCoords.x = moveEvt.clientX;
        },
        y: function () {
          shift.y = moveEvt.clientY - startCoords.y;
          top = mapPinMainBtn.offsetTop + shift.y;
          mapPinMainBtn.style.top = top + 'px';
          startCoords.y = moveEvt.clientY;
        },
      };

      var isBtnOut = {
        left: function () {
          return Math.round(ghostLeft + width / 2) < 0;
        },
        right: function () {
          return Math.round(ghostLeft + width / 2) > mapWidth;
        },
        top: function () {
          return ghostTop + height < window.data.LOCATION_Y.MIN;
        },
        bottom: function () {
          return ghostTop + height > window.data.LOCATION_Y.MAX;
        },
      };

      var isBtnOnMap = {
        x: function () {
          return !isBtnOut.left() && !isBtnOut.right();
        },
        y: function () {
          return !isBtnOut.top() && !isBtnOut.bottom();
        },
      };

      var toStick = {
        left: function () {
          mapPinMainBtn.style.left = (0 - width / 2) + 'px';
        },
        right: function () {
          mapPinMainBtn.style.left = (mapWidth - width / 2) + 'px';
        },
        top: function () {
          mapPinMainBtn.style.top = (window.data.LOCATION_Y.MIN - height) + 'px';
        },
        bottom: function () {
          mapPinMainBtn.style.top = (window.data.LOCATION_Y.MAX - height) + 'px';
        },
      };

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
        case (isBtnOut.left() && isBtnOnMap.y()):
          toStick.left();
          moveInMap.y();
          break;
        case (isBtnOut.right() && isBtnOnMap.y()):
          toStick.right();
          moveInMap.y();
          break;
        case (isBtnOut.top() && isBtnOnMap.x()):
          toStick.top();
          moveInMap.x();
          break;
        case (isBtnOut.bottom() && isBtnOnMap.x()):
          toStick.bottom();
          moveInMap.x();
          break;
        case (isBtnOut.left() && isBtnOut.top()):
          toStick.left();
          toStick.top();
          break;
        case (isBtnOut.left() && isBtnOut.bottom()):
          toStick.left();
          toStick.bottom();
          break;
        case (isBtnOut.right() && isBtnOut.top()):
          toStick.right();
          toStick.top();
          break;
        case (isBtnOut.right() && isBtnOut.bottom()):
          toStick.right();
          toStick.bottom();
          break;
        case (isBtnOnMap.x() && isBtnOnMap.y()):
          moveInMap.x();
          moveInMap.y();
          break;
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
