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
    renderElement.style.display = 'none';
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

  var appendCardsFragment = function (dataArray) {
    var fragment = document.createDocumentFragment();
    for (var item = 0; item < dataArray.length; item++) {
      fragment.appendChild(renderCard(dataArray[item]));
    }
    filterContainerElement.parentNode.insertBefore(fragment, filterContainerElement);
  };

  appendCardsFragment(window.data.dataAds);

  var closeBtns = window.element.map.querySelectorAll('.map__card .popup__close');
  var addCloseBtnHandler = function (closeBtn, cardIndex) {
    closeBtn.addEventListener('click', function (evt) {
      evt.preventDefault();
      window.card.hidePinCard(cardIndex + 1);
    });
  };
  for (var i = 0; i < closeBtns.length; i++) {
    addCloseBtnHandler(closeBtns[i], i);
  }

  window.card = {
    isShowCard: false,
    indexShowCard: 0,
    showPinCard: function (cardElementIndex) {
      window.element.map.querySelector('.map__card:nth-of-type(' + cardElementIndex + ')').style.display = 'block';
      this.isShowCard = true;
      this.indexShowCard = cardElementIndex;
      // filterContainerElement.insertAdjacentElement('beforebegin', renderCard(window.data.dataAds[0]));
    },
    hidePinCard: function (cardElementIndex) {
      window.element.map.querySelector('.map__card:nth-of-type(' + cardElementIndex + ')').style.display = 'none';
      this.isShowCard = false;
      this.indexShowCard = 0;
    },
  };
})();
