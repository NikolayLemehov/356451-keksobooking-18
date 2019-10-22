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
    dataArray.forEach(function (it) {
      fragment.appendChild(renderPhotos(it));
    });
    parentElement.appendChild(fragment);
    parentElement.querySelector('.popup__photo').remove();
  };

  var renderCard = function (data) {
    var element = cardTemplate.cloneNode(true);
    element.style.display = 'none';
    var titleElement = element.querySelector('.popup__title');
    var addressElement = element.querySelector('.popup__text--address');
    var priceElement = element.querySelector('.popup__text--price');
    var typeElement = element.querySelector('.popup__type');
    var capacityElement = element.querySelector('.popup__text--capacity');
    var timeElement = element.querySelector('.popup__text--time');
    var featuresElement = element.querySelector('.popup__features');
    var descriptionElement = element.querySelector('.popup__description');
    var photosElement = element.querySelector('.popup__photos');
    if (!data.offer.title) {
      titleElement.style.display = 'none';
    }
    if (!data.offer.address) {
      addressElement.style.display = 'none';
    }
    if (!(data.offer.price >= 0)) {
      priceElement.style.display = 'none';
    }
    if (!data.offer.type) {
      typeElement.style.display = 'none';
    }
    if (!(data.offer.rooms >= 0) || !(data.offer.guests >= 0)) {
      capacityElement.style.display = 'none';
    }
    if (!data.offer.checkin || !data.offer.checkout) {
      timeElement.style.display = 'none';
    }
    if (data.offer.features === []) {
      featuresElement.style.display = 'none';
    }
    if (!data.offer.description) {
      descriptionElement.style.display = 'none';
    }
    if (data.offer.photos === []) {
      photosElement.style.display = 'none';
    }
    titleElement.textContent = data.offer.title;
    addressElement.textContent = data.offer.address;
    priceElement.textContent = data.offer.price + '₽/ночь';
    typeElement.textContent = window.data.typeTranslationMap[data.offer.type];
    capacityElement.textContent = data.offer.rooms + ' комнаты для ' + data.offer.guests + ' гостей';
    timeElement.textContent = 'Заезд после ' + data.offer.checkin + ', выезд до ' + data.offer.checkout;
    window.util.hideBlockInCollection(featuresElement.querySelectorAll('.popup__feature'), data.offer.features);
    descriptionElement.textContent = data.offer.description;
    appendPhotos(data.offer.photos, photosElement);
    element.querySelector('.popup__avatar').src = data.author.avatar;
    return element;
  };
  var appendCardsFragment = function (dataArray) {
    var fragment = document.createDocumentFragment();
    dataArray.forEach(function (it) {
      fragment.appendChild(renderCard(it));
    });
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
        window.card.hide(cardIndex + 1);
      });
    });
  };

  window.card = {
    booleanShow: false,
    indexShow: 0,
    onDocumentEscKeyDown: function (evt) {
      if (evt.keyCode === window.util.KEY_CODE.ESC) {
        window.card.hide(this.indexShow);
      }
    },
    show: function (cardElementIndex) {
      window.element.map.querySelector('.map__card:nth-of-type(' + cardElementIndex + ')').style.display = 'block';
      this.booleanShow = true;
      this.indexShow = cardElementIndex;
      document.addEventListener('keydown', this.onDocumentEscKeyDown);
    },
    hide: function (cardElementIndex) {
      window.element.map.querySelector('.map__card:nth-of-type(' + cardElementIndex + ')').style.display = 'none';
      document.removeEventListener('keydown', this.onDocumentEscKeyDown);
      this.booleanShow = false;
      this.indexShow = 0;
    },
    smartShow: function (cardElementIndex) {
      if (!this.booleanShow) {
        this.show(cardElementIndex);
      }
      if (this.indexShow !== cardElementIndex) {
        this.hide(this.indexShow);
        this.show(cardElementIndex);
      }
    },
    addElements: function (dataArray) {
      appendCardsFragment(dataArray);
      addCloseBtnsClick();
    },
    removeElements: function () {
      window.util.removeCollection(window.element.map.querySelectorAll('.map__card'));
      this.booleanShow = false;
    },
  };
})();
