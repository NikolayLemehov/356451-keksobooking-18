'use strict';

(function () {
  var AD_QUANTITY = 8;
  var AVATAR_NUMBER = 8;
  var TITLE = 'Заголовок предложения';
  var MIN_LOCATION_Y = 130;
  var MAX_LOCATION_Y = 630;
  var MIN_PRICE = 2000;
  var MAX_PRICE = 50000;
  var ROUNDING_PRICE = 100;
  var TYPES_TRANSLATION = {
    palace: 'Дворец',
    flat: 'Квартира',
    house: 'Дом',
    bungalo: 'Бунгало',
  };
  var MAX_ROOMS = 4;
  var MAX_GUESTS = 4;
  var CHECKINS = [
    '12:00',
    '13:00',
    '14:00',
  ];
  var CHECKOUTS = [
    '12:00',
    '13:00',
    '14:00',
  ];
  var FEATURES = [
    'wifi',
    'dishwasher',
    'parking',
    'washer',
    'elevator',
    'conditioner',
  ];
  var DESCRIPTIONS = [
    'Великолепная квартира-студия в центре Токио.',
    'Подходит как туристам, так и бизнесменам.',
    'Квартира полностью укомплектована и недавно отремонтирована.',
    'Паркоместо в подземном паркинге включено в стоимость аренды квартиры, с паркинга на этаж можно подняться на лифте.',
    'Близко от метро, всего 5 минут',
    'Далеко-далеко за словесными горами в стране гласных и согласных живут рыбные тексты.',
  ];
  var PHOTOS = [
    'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel3.jpg',
  ];

  var createDataAd = function () {
    var array = [];
    var avatars = window.util.shuffle(window.util.createArraySerialIntegerUrl(AVATAR_NUMBER));
    var types = Object.keys(TYPES_TRANSLATION);
    for (var i = 0; i < AD_QUANTITY; i++) {
      var locationX = window.util.findRandomInteger(1, window.element.map.offsetWidth);
      var locationY = window.util.findRandomInteger(MIN_LOCATION_Y, MAX_LOCATION_Y);
      var ad = {
        'author': {
          'avatar': avatars[i],
        },
        'offer': {
          'title': TITLE,
          'address': locationX + ', ' + locationY,
          'price': window.util.roundRandomInteger(MIN_PRICE, MAX_PRICE, ROUNDING_PRICE),
          'type': window.util.findRandomItemArray(types),
          'rooms': window.util.findRandomInteger(1, MAX_ROOMS),
          'guests': window.util.findRandomInteger(1, MAX_GUESTS),
          'checkin': window.util.findRandomItemArray(CHECKINS),
          'checkout': window.util.findRandomItemArray(CHECKOUTS),
          'features': window.util.findRandomSliceShuffleArray(FEATURES),
          'description': window.util.concatenateItemArray(window.util.findRandomSliceShuffleArray(DESCRIPTIONS)),
          'photos': window.util.findRandomSliceShuffleArray(PHOTOS),
        },
        'location': {
          'x': locationX,
          'y': locationY,
        },
      };
      array.push(ad);
    }
    return array;
  };

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
    dataAds: createDataAd()
  };
})();
