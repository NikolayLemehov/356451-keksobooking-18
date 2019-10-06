'use strict';

(function () {
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');
  var addError = function () {
    var element = errorTemplate.cloneNode(true);
    element.style.display = 'none';
    window.element.main.appendChild(element);
    return window.element.main.querySelector('.error');
  };
  var errorElement = addError();

  var errorMessageElement = errorElement.querySelector('.error__message');
  var errorBtn = errorElement.querySelector('.error__button');
  var clickErrorBtnHandler = function (evt) {
    evt.preventDefault();
    errorElement.style.display = 'none';
  };
  errorBtn.addEventListener('click', clickErrorBtnHandler);
  var pressEscErrorHandler = function (evt) {
    if (evt.keyCode === window.util.ESC_KEY_CODE) {
      errorElement.style.display = 'none';
      document.removeEventListener('keydown', pressEscErrorHandler);
    }
  };
  var showError = function () {
    errorElement.style.display = 'block';
    document.addEventListener('keydown', pressEscErrorHandler);
  };

  window.error = {
    onError: function (errorMessage) {
      showError();
      errorMessageElement.textContent = errorMessage;
    },
  };
})();
