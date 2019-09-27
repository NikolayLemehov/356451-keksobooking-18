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
var ENTER_KEYCODE = 13;

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

var getCoords = function (element) {
  var box = element.getBoundingClientRect();
  return {
    top: box.top + pageYOffset,
    left: box.left + pageXOffset,
  };
};

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

var setCollectionDisabled = function (collection) {
  for (var i = 0; i < collection.length; i++) {
    collection[i].setAttribute('disabled', 'disabled');
  }
};

var setCollectionAbled = function (collection) {
  for (var i = 0; i < collection.length; i++) {
    collection[i].removeAttribute('disabled');
  }
};

var mapFiltersSelectElement = mapElement.querySelector('.map__filter');
var mapFilterSelectElements = mapFiltersSelectElement.querySelectorAll('.map__filters');
var mapFeaturesSelectElement = mapElement.querySelector('.map__features');
var adFormElement = document.querySelector('.ad-form');
var adFormElements = adFormElement.querySelectorAll('.ad-form__element');
var adFormHeaderElement = adFormElement.querySelector('.ad-form-header');
var adFormTitleInput = adFormElement.querySelector('input[name="title"]');
var adFormAddressInput = adFormElement.querySelector('input[name="address"]');
var adFormRoomNumberSelect = adFormElement.querySelector('select[name="rooms"]');
var adFormCapacitySelect = adFormElement.querySelector('select[name="capacity"]');
var mapPinMainBtn = document.querySelector('.map__pin--main');
var pinMainStyle = getComputedStyle(mapPinMainBtn, ':after');

var convertPixelToInteger = function (string) {
  return Number(string.slice(0, -2));
};

var getTransformYFromMatrix = function (matrix) {
  return Number(matrix.slice(matrix.lastIndexOf(', ') + 2, -1));
};

var getCoordsElementOnMap = function (element) {
  return {
    centerX: Math.round(getCoords(element).left - getCoords(mapElement).left +
      convertPixelToInteger(getComputedStyle(element).width) / 2),
    centerY: Math.round(getCoords(element).left - getCoords(mapElement).left +
      convertPixelToInteger(getComputedStyle(element).height) / 2),
    bottomY: Math.round(getCoords(element).left - getCoords(mapElement).left +
      convertPixelToInteger(getComputedStyle(element).height)),
  };
};

var init = function () {
  appendPinsFragment(dataAds);
  filterContainerElement.insertAdjacentElement('beforebegin', renderCard(dataAds[FIRST_INDEX]));
  // mapFiltersSelectElement.classList.add('');
  mapFeaturesSelectElement.setAttribute('disabled', 'disabled');
  adFormHeaderElement.setAttribute('disabled', 'disabled');
  setCollectionDisabled(mapFilterSelectElements);
  setCollectionDisabled(adFormElements);
  adFormAddressInput.value = getCoordsElementOnMap(mapPinMainBtn).centerX + ', ' +
    getCoordsElementOnMap(mapPinMainBtn).centerY;
};

var getAddressFromPinParameter = function () {
  pinMainStyle = window.getComputedStyle(mapPinMainBtn, 'after');
  adFormAddressInput.value = getCoordsElementOnMap(mapPinMainBtn).centerX + ', ' +
    (getCoordsElementOnMap(mapPinMainBtn).bottomY +
      getTransformYFromMatrix(pinMainStyle.transform) + convertPixelToInteger(pinMainStyle.borderTopWidth));
};

var activatePage = function () {
  mapElement.classList.remove('map--faded');
  adFormElement.classList.remove('ad-form--disabled');
  mapFeaturesSelectElement.removeAttribute('disabled');
  adFormHeaderElement.removeAttribute('disabled');
  setCollectionAbled(mapFilterSelectElements);
  setCollectionAbled(adFormElements);
  setTimeout(getAddressFromPinParameter, 400);
};

var validateTitle = function () {
  adFormTitleInput.setAttribute('value', 'minlength="30"');
  adFormTitleInput.setAttribute('value', 'maxlength="100"');
};

var validateGuest = function () {
  // console.log('test');
  // var selectedRoom = adFormRoomNumberSelect.querySelector('option[selected]');
  // var valueRoom1 = selectedRoom.getAttribute('value');
  var valueRoom = adFormRoomNumberSelect.options[adFormRoomNumberSelect.selectedIndex].value;
  // var selectedCapacity = adFormCapacitySelect.querySelector('option[selected]');
  var valueCapacity = adFormCapacitySelect.options[adFormCapacitySelect.selectedIndex].value;
  if (valueRoom === '100' && valueCapacity !== '0') {
    // adFormCapacitySelect.setCustomValidity('При таком количестве комнат гостей быть не может.');
    adFormRoomNumberSelect.setCustomValidity('При таком количестве комнат гостей быть не может.');
    adFormElement.submit();
    // console.log('При таком количестве комнат гостей быть не может.');
  } else {
    adFormCapacitySelect.setCustomValidity('');
  }
  // valueRoom === '100' && valueCapacity !== '0' ? adFormTitleInput.setCustomValidity('При таком количестве комнат гостей быть не может.') :
  //   adFormCapacitySelect.setCustomValidity('');
  console.log(adFormCapacitySelect);
};

adFormRoomNumberSelect.addEventListener('change', validateGuest);

adFormCapacitySelect.addEventListener('click', function () {
  validateGuest();
});

mapPinMainBtn.addEventListener('mousedown', function () {
  activatePage();
});

mapPinMainBtn.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    activatePage();
  }
});

init();
activatePage();
