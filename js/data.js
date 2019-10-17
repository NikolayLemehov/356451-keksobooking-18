'use strict';

(function () {
  window.data = {
    LOCATION_Y: {
      MIN: 130,
      MAX: 630,
    },
    typeTranslationMap: {
      palace: 'Дворец',
      house: 'Дом',
      flat: 'Квартира',
      bungalo: 'Бунгало',
    },
    typeToPrice: {
      palace: 10000,
      house: 5000,
      flat: 1000,
      bungalo: 0,
    },
    roomNumberToCapacity: {
      '1': ['1'],
      '2': ['1', '2'],
      '3': ['1', '2', '3'],
      '100': ['0']
    },
  };
})();
