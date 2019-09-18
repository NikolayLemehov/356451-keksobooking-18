'use strict';

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

var randomInteger = function (min, max) {
  return Math.floor(min + Math.random() * (max + 1 - min));
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
    array.push(i + 1);
  }
  return array;
};
console.log(shuffle(createArraySerialInteger(AVATAR_NUMBER)));
