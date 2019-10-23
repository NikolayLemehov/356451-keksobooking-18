'use strict';

(function () {
  var adFormElement = document.querySelector('.ad-form');
  var adFormElements = adFormElement.querySelectorAll('.ad-form__element');
  var adFormHeaderElement = adFormElement.querySelector('.ad-form-header');
  var adFormTitleInput = adFormElement.querySelector('input[name="title"]');
  var adFormAddressInput = adFormElement.querySelector('input[name="address"]');
  var adFormTypeSelect = adFormElement.querySelector('select[name="type"]');
  var adFormPriceInput = adFormElement.querySelector('input[name="price"]');
  var adFormTimeinSelect = adFormElement.querySelector('select[name="timein"]');
  var adFormTimeoutSelect = adFormElement.querySelector('select[name="timeout"]');
  var adFormRoomNumberSelect = adFormElement.querySelector('select[name="rooms"]');
  var adFormCapacitySelect = adFormElement.querySelector('select[name="capacity"]');
  var adFormSubmitBtn = adFormElement.querySelector('.ad-form__submit');

  var createActualCapacity = function (roomValue) {
    Array.from(adFormCapacitySelect.options).forEach(function (it, i) {
      this[i].setAttribute('disabled', 'disabled');
    }, adFormCapacitySelect.options);
    Array.from(window.data.roomNumberToCapacity[roomValue]).forEach(function (it, i) {
      var selector = 'option[value="' + window.data.roomNumberToCapacity[roomValue][i] + '"]';
      adFormCapacitySelect.querySelector(selector).removeAttribute('disabled');
    }, window.data.roomNumberToCapacity[roomValue]);
  };

  var validateCapacity = function () {
    createActualCapacity(adFormRoomNumberSelect.options[adFormRoomNumberSelect.selectedIndex].value);
    if (adFormCapacitySelect.options[adFormCapacitySelect.selectedIndex].disabled) {
      adFormCapacitySelect.setCustomValidity('При таком количестве комнат гостей должно быть другое количество.');
    } else {
      adFormCapacitySelect.setCustomValidity('');
    }
  };

  var selectedType = adFormTypeSelect.options[adFormTypeSelect.selectedIndex];
  var minPrice = window.data.typeToPrice[selectedType.value];
  var validatePrice = function () {
    selectedType = adFormTypeSelect.options[adFormTypeSelect.selectedIndex];
    minPrice = window.data.typeToPrice[selectedType.value];
    var maxPrice = Number(adFormPriceInput.getAttribute('max'));
    adFormPriceInput.setAttribute('min', minPrice);
    adFormPriceInput.setAttribute('placeholder', minPrice);
    switch (true) {
      case (adFormPriceInput.value < minPrice):
        adFormPriceInput.setCustomValidity('При типе жилья "' + selectedType.textContent +
          '" цена должна быть не меньше чем "' + minPrice + '".');
        break;
      case (adFormPriceInput.value > maxPrice):
        adFormPriceInput.setCustomValidity('Цена на жильё не может превышать ' + maxPrice + ' руб.');
        break;
      default :
        adFormPriceInput.setCustomValidity('');
    }
  };

  var validateTimeout = function () {
    adFormTimeoutSelect.selectedIndex = adFormTimeinSelect.selectedIndex;
  };
  var validateTimein = function () {
    adFormTimeinSelect.selectedIndex = adFormTimeoutSelect.selectedIndex;
  };

  adFormRoomNumberSelect.addEventListener('change', function () {
    validateCapacity();
  });
  adFormCapacitySelect.addEventListener('change', function () {
    validateCapacity();
  });
  adFormTypeSelect.addEventListener('change', function () {
    validatePrice();
  });
  adFormPriceInput.addEventListener('change', function () {
    validatePrice();
  });
  adFormTimeinSelect.addEventListener('change', function () {
    validateTimeout();
  });
  adFormTimeoutSelect.addEventListener('change', function () {
    validateTimein();
  });

  adFormSubmitBtn.addEventListener('click', function (evt) {
    if (adFormElement.checkValidity()) {
      evt.preventDefault();
      window.backend.save(new FormData(adFormElement), window.success.save, window.onError);
    }
  });
  var adFormResetBtn = document.querySelector('.ad-form__reset');
  adFormResetBtn.addEventListener('click', function () {
    adFormElement.reset();
    window.page.deactivate();
  });

  window.setColorErrorBeforeSubmitForm([adFormTitleInput, adFormPriceInput, adFormCapacitySelect]);

  window.form = {
    addressInput: adFormAddressInput,
    element: adFormElement,
    deactivate: function () {
      adFormElement.classList.add('ad-form--disabled');
      adFormHeaderElement.setAttribute('disabled', 'disabled');
      window.util.setCollectionDisabled(adFormElements);
      window.deactivateImages();
    },
    activate: function () {
      adFormElement.classList.remove('ad-form--disabled');
      adFormHeaderElement.removeAttribute('disabled');
      window.util.setCollectionAble(adFormElements);
      createActualCapacity(adFormRoomNumberSelect.options[adFormRoomNumberSelect.selectedIndex].value);
    },
    getActualPlaceholderPrice: function () {
      selectedType = adFormTypeSelect.options[adFormTypeSelect.selectedIndex];
      minPrice = window.data.typeToPrice[selectedType.value];
      adFormPriceInput.setAttribute('placeholder', minPrice);
    },
  };
})();
