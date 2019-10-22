'use strict';

(function () {
  var toColorInvalid = function (element) {
    element.style.backgroundColor = 'red';
  };
  var toColorValid = function (element) {
    element.style.backgroundColor = 'white';
  };

  window.setColorErrorBeforeSubmitForm = function (checkedFields) {
    checkedFields.forEach(function (checkedField) {
      checkedField.addEventListener('invalid', function () {
        toColorInvalid(checkedField);
      });
      checkedField.addEventListener('change', function () {
        if (checkedField.checkValidity()) {
          toColorValid(checkedField);
        }
      });
    });
  };
})();
