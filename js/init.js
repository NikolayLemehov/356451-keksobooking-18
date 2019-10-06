'use strict';

(function () {
  window.page.deactivatePage();
  window.backend.load(window.page.onSuccess, window.error.onError);
})();
