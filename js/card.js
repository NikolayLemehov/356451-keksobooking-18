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
    var element = cardTemplate.cloneNode(true);
    element.style.display = 'none';
    element.querySelector('.popup__title').textContent = data.offer.title;
    element.querySelector('.popup__text--address').textContent = data.offer.address;
    element.querySelector('.popup__text--price').textContent = data.offer.price + '₽/ночь';
    element.querySelector('.popup__type').textContent = window.data.TYPES_TRANSLATION[data.offer.type];
    element.querySelector('.popup__text--capacity').textContent = data.offer.rooms + ' комнаты для ' +
      data.offer.guests + ' гостей';
    element.querySelector('.popup__text--time').textContent = 'Заезд после ' + data.offer.checkin +
      ', выезд до ' + data.offer.checkout;
    window.util.hideBlockInCollection(element.querySelectorAll('.popup__feature'), data.offer.features);
    element.querySelector('.popup__description').textContent = data.offer.description;
    appendPhotos(data.offer.photos, element.querySelector('.popup__photos'));
    element.querySelector('.popup__avatar').src = data.author.avatar;
    return element;
  };
  var appendCardsFragment = function (dataArray) {
    var fragment = document.createDocumentFragment();
    for (var item = 0; item < dataArray.length; item++) {
      fragment.appendChild(renderCard(dataArray[item]));
    }
    document.querySelectorAll('.map__card').forEach(function (it) {
      it.remove();
    });
    filterContainerElement.parentNode.insertBefore(fragment, filterContainerElement);
  };
  var addCloseBtnsClick = function () {
    var closeBtns = window.element.map.querySelectorAll('.map__card .popup__close');
    closeBtns.forEach(function (closeBtn, cardIndex) {
      closeBtn.addEventListener('click', function (evt) {
        evt.preventDefault();
        window.card.hidePinCard(cardIndex + 1);
      });
    });
  };

  window.card = {
    isShowCard: false,
    indexShowCard: 0,
    onDocumentCardEscKeyDown: function (evt) {
      if (evt.keyCode === window.util.KEY_CODE.ESC) {
        window.card.hidePinCard(window.card.indexShowCard);
      }
    },
    showPinCard: function (cardElementIndex) {
      window.element.map.querySelector('.map__card:nth-of-type(' + cardElementIndex + ')').style.display = 'block';
      this.isShowCard = true;
      this.indexShowCard = cardElementIndex;
      document.addEventListener('keydown', this.onDocumentCardEscKeyDown);
    },
    hidePinCard: function (cardElementIndex) {
      window.element.map.querySelector('.map__card:nth-of-type(' + cardElementIndex + ')').style.display = 'none';
      document.removeEventListener('keydown', this.onDocumentCardEscKeyDown);
      this.isShowCard = false;
      this.indexShowCard = 0;
    },
    smartShowCard: function (cardElementIndex) {
      if (!this.isShowCard) {
        this.showPinCard(cardElementIndex);
      }
      if (this.indexShowCard !== cardElementIndex) {
        this.hidePinCard(this.indexShowCard);
        this.showPinCard(cardElementIndex);
      }
    },
    addCardsElement: function (dataArray) {
      appendCardsFragment(dataArray);
      addCloseBtnsClick();
    },
    removeCardElements: function () {
      window.util.removeCollection(window.element.map.querySelectorAll('.map__card'));
      this.isShowCard = false;
    },
  };
})();
