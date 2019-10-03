'use strict';

(function () {
  window.util = {
    ENTER_KEY_CODE: 13,
    ESC_KEY_CODE: 27,
    // FIRST_INDEX: 0,
    // findRandomInteger: function (min, max) {
    //   return Math.floor(min + Math.random() * (max + 1 - min));
    // },
    // roundRandomInteger: function (min, max, rounding) {
    //   return Math.floor(this.findRandomInteger(min, max) / rounding) * rounding;
    // },
    // shuffle: function (array) {
    //   for (var i = array.length - 1; i > 0; i--) {
    //     var j = Math.floor(Math.random() * (i + 1));
    //     var swap = array[j];
    //     array[j] = array[i];
    //     array[i] = swap;
    //   }
    //   return array;
    // },
    // createArraySerialIntegerUrl: function (number) {
    //   var array = [];
    //   for (var i = 0; i < number; i++) {
    //     array.push('img/avatars/user' + (i < 9 ? '0' : '') + (i + 1) + '.png');
    //   }
    //   return array;
    // },
    // concatenateItemArray: function (array) {
    //   var string = '' + array[0];
    //   if (array.length > 1) {
    //     for (var i = 1; i < array.length; i++) {
    //       string = string + ' ' + array[i];
    //     }
    //   }
    //   return string;
    // },
    // findRandomItemArray: function (array) {
    //   return array[this.findRandomInteger(0, array.length - 1)];
    // },
    // findRandomSliceShuffleArray: function (array) {
    //   return this.shuffle(array).slice(this.findRandomInteger(0, array.length - 1));
    // },
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
    convertPixelToInteger: function (string) {
      return Number(string.slice(0, -2));
    },
  };
})();
