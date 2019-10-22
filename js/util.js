'use strict';

(function () {
  window.util = {
    KEY_CODE: {
      ENTER: 13,
      ESC: 27,
    },
    getCoords: function (element) {
      var box = element.getBoundingClientRect();
      return {
        top: box.top + pageYOffset,
        left: box.left + pageXOffset,
      };
    },
    isArrayWordInString: function (string, array) {
      return array.some(function (it) {
        return string.includes(it);
      });
    },
    hideBlockInCollection: function (collection, arrayString) {
      collection.forEach(function (it) {
        if (!window.util.isArrayWordInString(it.getAttribute('class'), arrayString)) {
          it.style.display = 'none';
        }
      });
    },
    setCollectionDisabled: function (collection) {
      collection.forEach(function (it) {
        it.setAttribute('disabled', 'disabled');
      });
    },
    setCollectionAble: function (collection) {
      collection.forEach(function (it) {
        it.removeAttribute('disabled');
      });
    },
    removeCollection: function (collection) {
      collection.forEach(function (it) {
        it.remove();
      });
    },
    convertPixelToInteger: function (string) {
      return Number(string.slice(0, -2));
    },
  };
})();
