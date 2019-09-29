'use strict';

(function () {
  window.page = {
    activatePage: function () {
      window.map.activeElement();
      window.form.activeElement();
      setTimeout(window.pin.getAddressFromPinParameter, 400);
    },
  };
})();
