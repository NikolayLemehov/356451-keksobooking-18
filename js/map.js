'use strict';

(function () {
  window.map = {
    deactivate: function () {
      window.filter.deactivate();
      window.element.map.classList.add('map--faded');
      window.pin.removePinElements();
      window.card.removeElements();
    },
    activate: function () {
      window.element.map.classList.remove('map--faded');
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
