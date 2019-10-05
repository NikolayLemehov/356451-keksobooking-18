'use strict';

(function () {
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');

  window.error = {
    onError: function (errorMessage) {
      var adElement = errorTemplate.cloneNode(true);
      adElement.querySelector('.error__message').textContent = errorMessage;
      document.body.appendChild(adElement);
    },
  };
})();
