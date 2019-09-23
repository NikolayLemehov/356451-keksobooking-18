'use strict';

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
var FIRST_INDEX = 0;

var findRandomInteger = function (min, max) {
  return Math.floor(min + Math.random() * (max + 1 - min));
};

var roundRandomInteger = function (min, max, rounding) {
  return Math.floor(findRandomInteger(min, max) / rounding) * rounding;
};

var shuffle = function (array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var swap = array[j];
    array[j] = array[i];
    array[i] = swap;
  }
  return array;
};

var createArraySerialInteger = function (number) {
  var array = [];
  for (var i = 0; i < number; i++) {
    array.push('img/avatars/user' + (i < 9 ? '0' : '') + (i + 1) + '.png');
  }
  return array;
};

var concatenateItemArray = function (array) {
  var string = '' + array[0];
  if (array.length > 1) {
    for (var i = 1; i < array.length; i++) {
      string = string + ' ' + array[i];
    }
  }
  return string;
};

var findRandomItemArray = function (array) {
  return array[findRandomInteger(0, array.length - 1)];
};

var findRandomSliceShuffleArray = function (array) {
  return shuffle(array).slice(findRandomInteger(0, array.length - 1));
};

var createDataAd = function (locationBlock) {
  var array = [];
  var avatars = shuffle(createArraySerialInteger(AVATAR_NUMBER));
  var types = Object.keys(TYPES_TRANSLATION);
  for (var i = 0; i < AD_QUANTITY; i++) {
    var locationX = findRandomInteger(1, locationBlock.offsetWidth);
    var locationY = findRandomInteger(MIN_LOCATION_Y, MAX_LOCATION_Y);
    var ad = {
      'author': {
        'avatar': avatars[i],
      },
      'offer': {
        'title': TITLE,
        'address': locationX + ', ' + locationY,
        'price': roundRandomInteger(MIN_PRICE, MAX_PRICE, ROUNDING_PRICE),
        'type': findRandomItemArray(types),
        'rooms': findRandomInteger(1, MAX_ROOMS),
        'guests': findRandomInteger(1, MAX_GUESTS),
        'checkin': findRandomItemArray(CHECKINS),
        'checkout': findRandomItemArray(CHECKOUTS),
        'features': findRandomSliceShuffleArray(FEATURES),
        'description': concatenateItemArray(findRandomSliceShuffleArray(DESCRIPTIONS)),
        'photos': findRandomSliceShuffleArray(PHOTOS),
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

var mapElement = document.querySelector('.map');
var dataAds = createDataAd(mapElement);
var pinsElement = mapElement.querySelector('.map__pins');
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var filterContainerElement = mapElement.querySelector('.map__filters-container');
var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');

var renderPin = function (data) {
  var adElement = pinTemplate.cloneNode(true);
  adElement.style.left = data.location.x + 'px';
  adElement.style.top = data.location.y + 'px';
  adElement.style.transform = 'translate(-50%, -100%)';
  adElement.querySelector('img').src = data.author.avatar;
  adElement.querySelector('img').alt = data.offer.title;
  return adElement;
};

var appendPinsFragment = function (dataArray) {
  var fragment = document.createDocumentFragment();
  for (var item = 0; item < dataArray.length; item++) {
    fragment.appendChild(renderPin(dataArray[item]));
  }
  pinsElement.appendChild(fragment);
};

var isArrayWordInString = function (string, array) {
  for (var i = 0; i < array.length; i++) {
    if (string.includes(array[i])) {
      return true;
    }
  }
  return false;
};

var hideBlockInCollection = function (collection, arrayString) {
  for (var i = 0; i < collection.length; i++) {
    if (!isArrayWordInString(collection[i].getAttribute('class'), arrayString)) {
      collection[i].style.display = 'none';
    }
  }
};

var renderPhotos = function (data) {
  var renderElement = cardTemplate.querySelector('.popup__photo').cloneNode(true);
  renderElement.src = data;
  return renderElement;
};

var appendPhotos = function (dataArray, parentElement) {
  var fragment = document.createDocumentFragment();
  for (var item = 0; item < dataArray.length; item++) {
    fragment.appendChild(renderPhotos(dataArray[item]));
  }
  parentElement.appendChild(fragment);
  parentElement.querySelector('.popup__photo').remove();
};

var renderCard = function (data) {
  var renderElement = cardTemplate.cloneNode(true);
  renderElement.querySelector('.popup__title').textContent = data.offer.title;
  renderElement.querySelector('.popup__text--address').textContent = data.offer.address;
  renderElement.querySelector('.popup__text--price').textContent = data.offer.price + '₽/ночь';
  renderElement.querySelector('.popup__type').textContent = TYPES_TRANSLATION[data.offer.type];
  renderElement.querySelector('.popup__text--capacity').textContent = data.offer.rooms + ' комнаты для ' + data.offer.guests + ' гостей';
  renderElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + data.offer.checkin + ', выезд до ' + data.offer.checkout;
  hideBlockInCollection(renderElement.querySelectorAll('.popup__feature'), data.offer.features);
  renderElement.querySelector('.popup__description').textContent = data.offer.description;
  appendPhotos(data.offer.photos, renderElement.querySelector('.popup__photos'));
  renderElement.querySelector('.popup__avatar').src = data.author.avatar;
  return renderElement;
};

mapElement.classList.remove('map--faded');

appendPinsFragment(dataAds);
filterContainerElement.insertAdjacentElement('beforebegin', renderCard(dataAds[FIRST_INDEX]));
