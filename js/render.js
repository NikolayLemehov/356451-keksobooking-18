'use strict';

(function () {
  window.render = function (element) {
    document.body.prepend(element);
  };
})();
