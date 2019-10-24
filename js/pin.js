'use strict';

(function () {
  var PIN_LIMIT = 5;
  var Coords = function (evt) {
    this.x = evt.clientX;
    this.y = evt.clientY;
  };
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

    var startPin = new Coords(evt);
    var startGhost = new Coords(evt);
    var pin = {
      width: mapPinMainBtn.offsetWidth,
      height: Math.round(mapPinMainBtn.offsetHeight + pinUtils.getShiftFromBottomYMainPin()),
    };
    var ghost = {
      left: mapPinMainBtn.offsetLeft,
      top: mapPinMainBtn.offsetTop,
    };

    var mapWidth = window.element.map.offsetWidth;
    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      var shiftGhost = {
        x: null,
        y: null,
      };
      var movePin = {
        x: function () {
          var shiftPinX = moveEvt.clientX - startPin.x;
          mapPinMainBtn.style.left = (mapPinMainBtn.offsetLeft + shiftPinX) + 'px';
          startPin.x = moveEvt.clientX;
        },
        y: function () {
          var shiftPinY = moveEvt.clientY - startPin.y;
          mapPinMainBtn.style.top = (mapPinMainBtn.offsetTop + shiftPinY) + 'px';
          startPin.y = moveEvt.clientY;
        },
      };
      var moveGhost = {
        x: function () {
          shiftGhost.x = moveEvt.clientX - startGhost.x;
          ghost.left += shiftGhost.x;
          startGhost.x = moveEvt.clientX;
        },
        y: function () {
          shiftGhost.y = moveEvt.clientY - startGhost.y;
          ghost.top += shiftGhost.y;
          startGhost.y = moveEvt.clientY;
        },
      };

      var isBtnOut = {
        left: function () {
          return Math.round(ghost.left + pin.width / 2) < 0;
        },
        right: function () {
          return Math.round(ghost.left + pin.width / 2) > mapWidth;
        },
        top: function () {
          return ghost.top + pin.height < window.data.LOCATION_Y.MIN;
        },
        bottom: function () {
          return ghost.top + pin.height > window.data.LOCATION_Y.MAX;
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
          mapPinMainBtn.style.left = (0 - pin.width / 2) + 'px';
        },
        right: function () {
          mapPinMainBtn.style.left = (mapWidth - pin.width / 2) + 'px';
        },
        top: function () {
          mapPinMainBtn.style.top = (window.data.LOCATION_Y.MIN - pin.height) + 'px';
        },
        bottom: function () {
          mapPinMainBtn.style.top = (window.data.LOCATION_Y.MAX - pin.height) + 'px';
        },
      };

      moveGhost.x();
      moveGhost.y();

      switch (true) {
        case (isBtnOut.left() && isBtnOnMap.y()):
          toStick.left();
          movePin.y();
          break;
        case (isBtnOut.right() && isBtnOnMap.y()):
          toStick.right();
          movePin.y();
          break;
        case (isBtnOut.top() && isBtnOnMap.x()):
          toStick.top();
          movePin.x();
          break;
        case (isBtnOut.bottom() && isBtnOnMap.x()):
          toStick.bottom();
          movePin.x();
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
          movePin.x();
          movePin.y();
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
