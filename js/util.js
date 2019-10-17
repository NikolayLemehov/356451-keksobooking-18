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
      for (var i = 0; i < array.length; i++) {
        if (string.includes(array[i])) {
          return true;
        }
      }
      return false;
    },
    hideBlockInCollection: function (collection, arrayString) {
      for (var i = 0; i < collection.length; i++) {
        if (!this.isArrayWordInString(collection[i].getAttribute('class'), arrayString)) {
          collection[i].style.display = 'none';
        }
      }
    },
    setCollectionDisabled: function (collection) {
      for (var i = 0; i < collection.length; i++) {
        collection[i].setAttribute('disabled', 'disabled');
      }
    },
    setCollectionAble: function (collection) {
      for (var i = 0; i < collection.length; i++) {
        collection[i].removeAttribute('disabled');
      }
    },
    removeCollection: function (collection) {
      for (var i = 0; i < collection.length; i++) {
        collection[i].remove();
      }
    },
    convertPixelToInteger: function (string) {
      return Number(string.slice(0, -2));
    },
  };
})();
