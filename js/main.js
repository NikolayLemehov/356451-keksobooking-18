'use strict';

var AD_QUANTITY = 8;
var AVATAR_NUMBER = 8;
var TITLE = 'Заголовок предложения';
var MIN_LOCATION_Y = 130;
var MAX_LOCATION_Y = 630;
var MIN_PRICE = 20000;
var MAX_PRICE = 200000;
var TYPES = [
  'palace',
  'flat',
  'house',
  'bungalo',
];
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
  'conditioner'
];
var DESCRIPTION = 'Далеко-далеко за словесными горами в стране гласных и согласных живут рыбные тексты.';
var PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];

var map = document.querySelector('.map');
map.classList.remove('map--faded');
var pinsElement = map.querySelector('.map__pins');
var pinTemplate = document.querySelector('#pin')
  .content
  .querySelector('.map__pin');
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
    if (i < 9) {
      array.push('img/avatars/user0' + (i + 1) + '.png');
    }
    if (i >= 9) {
      array.push('img/avatars/user' + (i + 1) + '.png');
    }
  }
  return array;
};
var createDataAd = function (avatarNumber, title, locationBlock, minLocationY, maxLocationY, minPrice, maxPrice, types, maxRooms, maxGuests, checkins, checkouts, features, description, photos, adQuantity) {
  var array = [];
  var avatars = shuffle(createArraySerialInteger(avatarNumber));
  for (var i = 0; i < adQuantity; i++) {
    var ad = {
      'author': {
        'avatar': avatars[i]
      },
      'offer': {
        'title': title,
        'address': randomInteger(1, 8) + ', ' + randomInteger(minLocationY, maxLocationY),
        'price': roundingRandomInteger(minPrice, maxPrice, 1000),
        'type': types[randomInteger(0, types.length - 1)],
        'rooms': randomInteger(1, maxRooms),
        'guests': randomInteger(1, maxGuests),
        'checkin': checkins[randomInteger(0, checkins.length - 1)],
        'checkout': checkouts[randomInteger(0, checkouts.length - 1)],
        'features': shuffle(features).slice(randomInteger(0, features.length - 1)),
        'description': description,
        'photos': shuffle(photos).slice(randomInteger(0, photos.length - 1))
      },
      'location': {
        'x': randomInteger(1, map.offsetWidth),
        'y': randomInteger(minLocationY, maxLocationY)
      }
    };
    array.push(ad);
  }
  return array;
};
var dataAds = createDataAd(AVATAR_NUMBER, TITLE, map, MIN_LOCATION_Y, MAX_LOCATION_Y, MIN_PRICE, MAX_PRICE, TYPES, MAX_ROOMS, MAX_GUESTS, CHECKINS, CHECKOUTS, FEATURES, DESCRIPTION, PHOTOS, AD_QUANTITY);
var renderAd = function (ad) {
  var adElement = pinTemplate.cloneNode(true);
  adElement.style.left = '' + (ad.location.x - adElement.offsetWidth / 2) + 'px';
  adElement.style.top = '' + (ad.location.y - adElement.offsetHeight) + 'px';
  adElement.querySelector('img').src = ad.author.avatar;
  adElement.querySelector('img').alt = ad.offer.title;
  // console.log(adElement.offsetWidth, adElement.offsetHeight);
  return adElement;
};
var fragment = document.createDocumentFragment();
for (var i = 0; i < dataAds.length; i++) {
  fragment.appendChild(renderAd(dataAds[i]));
}
pinsElement.appendChild(fragment);
