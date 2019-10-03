'use strict';

(function () {
  var mapFiltersSelectElement = window.element.map.querySelector('.map__filter');
  var mapFilterSelectElements = mapFiltersSelectElement.querySelectorAll('.map__filters');
  var mapFeaturesSelectElement = window.element.map.querySelector('.map__features');

  // var addPinClickHandler = function (pin, pineIndex) {
  //   pin.addEventListener('click', function (evt) {
  //     evt.preventDefault();
  //     if (!window.card.isShowCard) {
  //       window.card.showPinCard(pineIndex + 1);
  //     }
  //     if (window.card.indexShowCard !== pineIndex + 1) {
  //       window.card.hidePinCard(window.card.indexShowCard);
  //       window.card.showPinCard(pineIndex + 1);
  //     }
  //     // console.log('click', pineIndex + 1, pin);
  //   });
  // };
  // for (var i = 0; i < window.pin.elements.length; i++) {
  //   addPinClickHandler(window.pin.elements[i], i);
  // }

  window.map = {
    init: function () {
      mapFeaturesSelectElement.setAttribute('disabled', 'disabled');
      window.util.setCollectionDisabled(mapFilterSelectElements);
    },
    activeElement: function () {
      window.element.map.classList.remove('map--faded');
      mapFeaturesSelectElement.removeAttribute('disabled');
      window.util.setCollectionAble(mapFilterSelectElements);
    },
    getCoordsElementOnMap: function (element) {
      return {
        centerX: Math.round(window.util.getCoords(element).left - window.util.getCoords(window.element.map).left +
          window.util.convertPixelToInteger(getComputedStyle(element).width) / 2),
        centerY: Math.round(window.util.getCoords(element).top - window.util.getCoords(window.element.map).top +
          window.util.convertPixelToInteger(getComputedStyle(element).height) / 2),
        bottomY: Math.round(window.util.getCoords(element).top - window.util.getCoords(window.element.map).top +
          window.util.convertPixelToInteger(getComputedStyle(element).height)),
      };
    },
  };
})();
