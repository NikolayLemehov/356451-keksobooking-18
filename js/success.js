'use strict';

(function () {
  var successTemplate = document.querySelector('#success').content.querySelector('.success');
  var addSuccess = function () {
    var element = successTemplate.cloneNode(true);
    element.style.display = 'none';
    window.element.main.appendChild(element);
    return window.element.main.querySelector('.success');
  };
  var successElement = addSuccess();

  var showSuccess = function () {
    if (window.card.booleanShow) {
      document.removeEventListener('keydown', window.card.onDocumentEscKeyDown);
    }
    successElement.style.display = 'block';
    document.addEventListener('keydown', onDocumentSuccessEscKeyDown);
    document.addEventListener('click', onDocumentSuccessClick);
  };
  var hideSuccess = function () {
    successElement.style.display = 'none';
    document.removeEventListener('keydown', onDocumentSuccessEscKeyDown);
    document.removeEventListener('click', onDocumentSuccessClick);
  };
  var onDocumentSuccessEscKeyDown = function (evt) {
    if (evt.keyCode === window.util.KEY_CODE.ESC) {
      hideSuccess();
    }
  };
  var onDocumentSuccessClick = function (evt) {
    evt.preventDefault();
    hideSuccess();
  };

  window.success = {
    load: function (data) {
      window.page.data = data;
      window.page.actualData = window.page.getActualData(data);
      window.filter.updateAds();
    },
    save: function () {
      showSuccess();
      window.form.element.reset();
      window.form.getActualPlaceholderPrice();
      window.page.deactivate();
    },
  };
})();
