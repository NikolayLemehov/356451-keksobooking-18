'use strict';

(function () {
  window.page.deactivatePage();
  window.backend.load(window.page.loadSuccessHandler, window.error.onError);
})();
