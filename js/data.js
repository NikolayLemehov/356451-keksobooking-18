'use strict';

(function () {
  var MIN_LOCATION_Y = 130;
  var MAX_LOCATION_Y = 630;

  window.data = {
    MIN_LOCATION_Y: MIN_LOCATION_Y,
    MAX_LOCATION_Y: MAX_LOCATION_Y,
    TYPES_TRANSLATION: {
      palace: 'Дворец',
      house: 'Дом',
      flat: 'Квартира',
      bungalo: 'Бунгало',
    },
    PRICE_FROM_TYPE: {
      palace: 10000,
      house: 5000,
      flat: 1000,
      bungalo: 0,
    },
    CAPACITY_FROM_ROOM_NUMBER: {
      '1': ['1'],
      '2': ['1', '2'],
      '3': ['1', '2', '3'],
      '100': ['0']
    },
  };
})();
