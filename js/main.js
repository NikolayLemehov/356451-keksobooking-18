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

var map = document.querySelector('.map');
map.classList.remove('map--faded');
var pinsElement = map.querySelector('.map__pins');
var pinTemplate = document.querySelector('#pin').content
  .querySelector('.map__pin');
var filterContainerElement = map.querySelector('.map__filters-container');
var cardTemplate = document.querySelector('#card').content
  .querySelector('.map__card');

var randomInteger = function (min, max) {
  return Math.floor(min + Math.random() * (max + 1 - min));
};
var roundingRandomInteger = function (min, max, rounding) {
  return Math.floor(randomInteger(min, max) / rounding) * rounding;
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
var randomItemArray = function (array) {
  return array[randomInteger(0, array.length - 1)];
};
var shuffleSliceArray = function (array) {
  return shuffle(array).slice(randomInteger(0, array.length - 1));
};
var createDataAd = function (locationBlock) {
  var array = [];
  var avatars = shuffle(createArraySerialInteger(AVATAR_NUMBER));
  var types = Object.keys(TYPES_TRANSLATION);
  for (var i = 0; i < AD_QUANTITY; i++) {
    var locationX = randomInteger(1, locationBlock.offsetWidth);
    var locationY = randomInteger(MIN_LOCATION_Y, MAX_LOCATION_Y);
    var ad = {
      'author': {
        'avatar': avatars[i],
      },
      'offer': {
        'title': TITLE,
        'address': locationX + ', ' + locationY,
        'price': roundingRandomInteger(MIN_PRICE, MAX_PRICE, ROUNDING_PRICE),
        'type': randomItemArray(types),
        'rooms': randomInteger(1, MAX_ROOMS),
        'guests': randomInteger(1, MAX_GUESTS),
        'checkin': randomItemArray(CHECKINS),
        'checkout': randomItemArray(CHECKOUTS),
        'features': shuffleSliceArray(FEATURES),
        'description': concatenateItemArray(shuffleSliceArray(DESCRIPTIONS)),
        'photos': shuffleSliceArray(PHOTOS),
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
var dataAds = createDataAd(map);

var renderPin = function (ad) {
  var adElement = pinTemplate.cloneNode(true);
  adElement.style.left = ad.location.x + 'px';
  adElement.style.top = ad.location.y + 'px';
  adElement.style.transform = 'translate(-50%, -100%)';
  adElement.querySelector('img').src = ad.author.avatar;
  adElement.querySelector('img').alt = ad.offer.title;
  return adElement;
};
var fragment = document.createDocumentFragment();
for (var item = 0; item < dataAds.length; item++) {
  fragment.appendChild(renderPin(dataAds[item]));
}
pinsElement.appendChild(fragment);

var isArrayInString = function (string, array) {
  for (var i = 0; i < array.length; i++) {
    if (string.includes(array[i])) {
      return true;
    }
  }
  return false;
};
var hideBlockInCollection = function (collection, arrayString) {
  for (var i = 0; i < collection.length; i++) {
    if (!isArrayInString(collection[i].getAttribute('class'), arrayString)) {
      collection[i].style.display = 'none';
    }
  }
};
var renderPhotos = function (photoList, photoItem, photos) {
  photoItem.src = photos[0];
  if (photos.length > 1) {
    var fragmentPhotoList = document.createDocumentFragment();
    for (var i = 1; i < photos.length; i++) {
      var photoElement = photoItem.cloneNode(true);
      photoElement.src = photos[i];
      fragmentPhotoList.appendChild(photoElement);
    }
    photoList.appendChild(fragmentPhotoList);
  }
};
var renderCard = function (ad) {
  var cardElement = cardTemplate.cloneNode(true);
  cardElement.querySelector('.popup__title').textContent = ad.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = ad.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = ad.offer.price + '₽/ночь';
  cardElement.querySelector('.popup__type').textContent = TYPES_TRANSLATION[ad.offer.type];
  cardElement.querySelector('.popup__text--capacity').textContent = ad.offer.rooms + ' комнаты для ' + ad.offer.guests + ' гостей';
  cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + ad.offer.checkin + ', выезд до ' + ad.offer.checkout;
  hideBlockInCollection(cardElement.querySelectorAll('.popup__feature'), ad.offer.features);
  cardElement.querySelector('.popup__description').textContent = ad.offer.description;
  renderPhotos(cardElement.querySelector('.popup__photos'), cardElement.querySelector('.popup__photo'), ad.offer.photos);
  cardElement.querySelector('.popup__avatar').src = ad.author.avatar;
  return cardElement;
};
filterContainerElement.insertAdjacentElement('beforebegin', renderCard(dataAds[0]));
