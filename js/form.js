'use strict';

(function () {
  var adFormElement = document.querySelector('.ad-form');
  var adFormElements = adFormElement.querySelectorAll('.ad-form__element');
  var adFormHeaderElement = adFormElement.querySelector('.ad-form-header');
  // var adFormTitleInput = adFormElement.querySelector('input[name="title"]');
  var adFormAddressInput = adFormElement.querySelector('input[name="address"]');
  var adFormTypeSelect = adFormElement.querySelector('select[name="type"]');
  var adFormPriceInput = adFormElement.querySelector('input[name="price"]');
  var adFormRoomNumberSelect = adFormElement.querySelector('select[name="rooms"]');
  var adFormCapacitySelect = adFormElement.querySelector('select[name="capacity"]');
  var adFormSubmitBtn = adFormElement.querySelector('.ad-form__submit');

  var createActualCapacity = function (roomValue) {
    for (var i = 0; i < adFormCapacitySelect.options.length; i++) {
      adFormCapacitySelect.options[i].setAttribute('disabled', 'disabled');
    }
    for (i = 0; i < window.data.CAPACITY_FROM_ROOM_NUMBER[roomValue].length; i++) {
      var selector = 'option[value="' + window.data.CAPACITY_FROM_ROOM_NUMBER[roomValue][i] + '"]';
      adFormCapacitySelect.querySelector(selector).removeAttribute('disabled');
    }
  };

  var validateCapacity = function () {
    createActualCapacity(adFormRoomNumberSelect.options[adFormRoomNumberSelect.selectedIndex].value);
    if (adFormCapacitySelect.options[adFormCapacitySelect.selectedIndex].disabled) {
      adFormCapacitySelect.setCustomValidity('При таком количестве комнат гостей должно быть другое количество.');
      adFormSubmitBtn.click();
    } else {
      adFormCapacitySelect.setCustomValidity('');
    }
  };

  var validatePrice = function () {
    var selected = adFormTypeSelect.options[adFormTypeSelect.selectedIndex];
    var minPrice = window.data.PRICE_FROM_TYPE[selected.value];
    var maxPrice = Number(adFormPriceInput.getAttribute('max'));
    adFormPriceInput.setAttribute('min', minPrice);
    switch (true) {
      case (adFormPriceInput.value < minPrice):
        adFormPriceInput.setCustomValidity('При типе жилья "' + selected.textContent +
          '" цена должна быть не меньше чем "' + minPrice + '".');
        adFormSubmitBtn.click();
        break;
      case (adFormPriceInput.value > maxPrice):
        adFormPriceInput.setCustomValidity('Цена на жильё не может превышать ' + maxPrice + ' руб.');
        adFormSubmitBtn.click();
        break;
      default : adFormPriceInput.setCustomValidity('');
    }
  };

  adFormRoomNumberSelect.addEventListener('change', validateCapacity);
  adFormCapacitySelect.addEventListener('change', validateCapacity);
  adFormTypeSelect.addEventListener('change', validatePrice);
  adFormPriceInput.addEventListener('change', validatePrice);

  window.form = {
    adFormAddressInput: adFormAddressInput,
    init: function () {
      adFormHeaderElement.setAttribute('disabled', 'disabled');
      window.util.setCollectionDisabled(adFormElements);
    },
    activeElement: function () {
      adFormElement.classList.remove('ad-form--disabled');
      adFormHeaderElement.removeAttribute('disabled');
      window.util.setCollectionAble(adFormElements);
    }
  };
})();