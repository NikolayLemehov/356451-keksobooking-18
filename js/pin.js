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
    window.render(movePin);
    getAddressFromPinParameter();
  });
  var movePin = window.createSlider(function (sliderX, sliderY) {
    mapPinMainBtn.addEventListener('mousedown', function (downEvt) {
      if (!window.page.booleanActive) {
        window.page.activate();
        return;
      }
      var diffY = mapPinMainBtn.getBoundingClientRect().height / 2 -
        (pinUtils.getBottomYMainPin() - window.map.getCoordsPinOnElement(mapPinMainBtn).topY);
      sliderX.min = 0;
      sliderX.max = window.element.map.getBoundingClientRect().width;
      sliderY.min = window.data.LOCATION_Y.MIN + diffY;
      sliderY.max = window.data.LOCATION_Y.MAX + diffY;
      var getPinPosition = function (evt) {
        sliderX.value = (evt.clientX - window.element.map.getBoundingClientRect().left);
        mapPinMainBtn.style.left = (sliderX.value - mapPinMainBtn.getBoundingClientRect().width / 2) + 'px';
        sliderY.value = (evt.clientY - window.element.map.getBoundingClientRect().top);
        mapPinMainBtn.style.top = (sliderY.value - mapPinMainBtn.getBoundingClientRect().height / 2) + 'px';
      };
      getPinPosition(downEvt);

      var onMouseMove = function (moveEvt) {
        moveEvt.preventDefault();
        getPinPosition(moveEvt);
        getAddressFromPinParameter();
      };
      var onMouseUp = function () {
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      };
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    });
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
