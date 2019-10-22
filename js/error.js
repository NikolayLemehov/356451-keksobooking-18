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
  var onErrorBtnClick = function (evt) {
    evt.preventDefault();
    hideErrorElement();
  };
  errorBtn.addEventListener('click', onErrorBtnClick);
  var onDocumentErrorEscKeyDown = function (evt) {
    if (evt.keyCode === window.util.KEY_CODE.ESC) {
      hideErrorElement();
    }
  };
  var showError = function () {
    if (window.card.booleanShow) {
      document.removeEventListener('keydown', window.card.onDocumentEscKeyDown);
    }
    errorElement.style.display = 'block';
    document.addEventListener('keydown', onDocumentErrorEscKeyDown);
  };
  var hideErrorElement = function () {
    if (window.card.booleanShow) {
      document.addEventListener('keydown', window.card.onDocumentEscKeyDown);
    }
    errorElement.style.display = 'none';
    document.removeEventListener('keydown', onDocumentErrorEscKeyDown);
  };

  window.error = {
    on: function (errorMessage) {
      showError();
      errorMessageElement.textContent = errorMessage;
    },
  };
})();
