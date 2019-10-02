'use strict';

(function () {
  window.page = {
    isActivePage: false,
    activatePage: function () {
      window.map.activeElement();
      window.form.activeElement();
      setTimeout(window.pin.getAddressFromPinParameter, 400);
      this.isActivePage = true;
    },
  };
})();
