'use strict';

(function () {
  window.data = {
    LOCATION_Y: {
      MIN: 130,
      MAX: 630,
    },
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
