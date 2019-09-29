'use strict';

(function () {
  var filterContainerElement = window.element.map.querySelector('.map__filters-container');
  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');

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
    renderElement.querySelector('.popup__type').textContent = window.data.TYPES_TRANSLATION[data.offer.type];
    renderElement.querySelector('.popup__text--capacity').textContent = data.offer.rooms + ' комнаты для ' +
      data.offer.guests + ' гостей';
    renderElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + data.offer.checkin +
      ', выезд до ' + data.offer.checkout;
    window.util.hideBlockInCollection(renderElement.querySelectorAll('.popup__feature'), data.offer.features);
    renderElement.querySelector('.popup__description').textContent = data.offer.description;
    appendPhotos(data.offer.photos, renderElement.querySelector('.popup__photos'));
    renderElement.querySelector('.popup__avatar').src = data.author.avatar;
    return renderElement;
  };

  filterContainerElement.insertAdjacentElement('beforebegin', renderCard(window.data.dataAds[window.util.FIRST_INDEX]));
})();
