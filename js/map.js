'use strict';

(function () {
  var mapFiltersSelectElement = window.element.map.querySelector('.map__filter');
  var mapFilterSelectElements = mapFiltersSelectElement.querySelectorAll('.map__filters');
  var mapFeaturesSelectElement = window.element.map.querySelector('.map__features');

  window.map = {
    deactivate: function () {
      mapFeaturesSelectElement.setAttribute('disabled', 'disabled');
      window.util.setCollectionDisabled(mapFilterSelectElements);
      window.element.map.classList.add('map--faded');
      window.pin.removePinElements();
      window.card.removeCardElements();
    },
    activateElement: function () {
      window.element.map.classList.remove('map--faded');
      mapFeaturesSelectElement.removeAttribute('disabled');
    },
    activateFilter: function () {
      window.util.setCollectionAble(mapFilterSelectElements);
    },
    getCoordsElementOnMap: function (element) {
      return {
        leftX: Math.round(window.util.getCoords(element).left - window.util.getCoords(window.element.map).left),
        centerX: Math.round(window.util.getCoords(element).left - window.util.getCoords(window.element.map).left +
          window.util.convertPixelToInteger(getComputedStyle(element).width) / 2),
        topY: Math.round(window.util.getCoords(element).top - window.util.getCoords(window.element.map).top),
        centerY: Math.round(window.util.getCoords(element).top - window.util.getCoords(window.element.map).top +
          window.util.convertPixelToInteger(getComputedStyle(element).height) / 2),
        bottomY: Math.round(window.util.getCoords(element).top - window.util.getCoords(window.element.map).top +
          window.util.convertPixelToInteger(getComputedStyle(element).height)),
      };
    },
  };
})();
