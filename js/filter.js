'use strict';

(function () {
  var PriceSeparator = {
    LOW: 1000,
    HIGH: 50000,
  };
  var Anyone = {
    TYPE: 'any',
    PRICE: 'any',
    ROOM: 'any',
    GUEST: 'any',
  };

  var doPerChangeFilterAd = function () {
    if (window.card.booleanShow) {
      window.card.hide(window.card.indexShow);
    }
    window.filter.updateAds();
  };

  var housingTypeSelect = document.querySelector('#housing-type');
  var type = housingTypeSelect.options[housingTypeSelect.selectedIndex].value;
  housingTypeSelect.addEventListener('change', function () {
    onTypeChange(housingTypeSelect.options[housingTypeSelect.selectedIndex].value);
  });
  var onTypeChange = function (filterType) {
    type = filterType;
    doPerChangeFilterAd();
  };

  var housingPriceSelect = document.querySelector('#housing-price');
  var price = housingPriceSelect.options[housingPriceSelect.selectedIndex].value;
  housingPriceSelect.addEventListener('change', function () {
    onPriceChange(housingPriceSelect.options[housingPriceSelect.selectedIndex].value);
  });
  var onPriceChange = function (filterPrice) {
    price = filterPrice;
    doPerChangeFilterAd();
  };
  var toGradePrice = function (priceNumber) {
    switch (true) {
      case (priceNumber < PriceSeparator.LOW):
        return 'low';
      case (priceNumber >= PriceSeparator.LOW && priceNumber <= PriceSeparator.HIGH):
        return 'middle';
      case (priceNumber > PriceSeparator.HIGH):
        return 'high';
    }
    return null;
  };

  var housingRoomsSelect = document.querySelector('#housing-rooms');
  var roomNumber = housingRoomsSelect.options[housingRoomsSelect.selectedIndex].value;
  housingRoomsSelect.addEventListener('change', function () {
    onRoomChange(housingRoomsSelect.options[housingRoomsSelect.selectedIndex].value);
  });
  var onRoomChange = function (filterRoom) {
    roomNumber = filterRoom;
    doPerChangeFilterAd();
  };

  var housingGuestsSelect = document.querySelector('#housing-guests');
  var guestNumber = housingGuestsSelect.options[housingGuestsSelect.selectedIndex].value;
  housingGuestsSelect.addEventListener('change', function () {
    onGuestChange(housingGuestsSelect.options[housingGuestsSelect.selectedIndex].value);
  });
  var onGuestChange = function (filterGuest) {
    guestNumber = filterGuest;
    doPerChangeFilterAd();
  };

  var presenceFeatures = [];
  var featuresElements = document.querySelectorAll('#housing-features input[name="features"]');
  featuresElements.forEach(function (checkbox) {
    var feature = checkbox.getAttribute('value');
    if (checkbox.checked) {
      presenceFeatures.push(feature);
    }
    checkbox.addEventListener('change', function () {
      onFeaturesChange(feature, checkbox.checked);
    });
  });
  var onFeaturesChange = function (feature, presence) {
    if (presence) {
      presenceFeatures.push(feature);
    } else {
      var index = presenceFeatures.indexOf(feature);
      presenceFeatures.splice(index, 1);
    }
    doPerChangeFilterAd();
  };
  var isFeatures = function (dataFeatures) {
    var booleanFit = true;
    presenceFeatures.forEach(function (feature) {
      booleanFit = booleanFit && !!dataFeatures.find(function (it) {
        return feature === it;
      });
    });
    return booleanFit;
  };
  var mapFiltersForm = window.element.map.querySelector('.map__filters');
  var mapFilterSelectElements = mapFiltersForm.querySelectorAll('.map__filter');
  var mapFeaturesSelectElement = window.element.map.querySelector('.map__features');

  window.filter = {
    updateAds: window.debounce(function () {
      var filteredAds = window.page.actualData.slice();
      filteredAds = filteredAds.filter(function (it) {
        var features = it.offer.features;
        var booleanTypeMatch = type === it.offer.type || type === Anyone.TYPE;
        var priceNumber = it.offer.price;
        var booleanPriceMatch = price === toGradePrice(priceNumber) || price === Anyone.PRICE;
        var booleanRoomMatch = roomNumber === it.offer.rooms.toString() || roomNumber === Anyone.ROOM;
        var booleanGuestMatch = guestNumber === it.offer.guests.toString() || guestNumber === Anyone.GUEST;
        return booleanTypeMatch && booleanRoomMatch && booleanGuestMatch && booleanPriceMatch && isFeatures(features);
      });
      window.pin.addElements(filteredAds);
    }),
    activate: function () {
      window.util.setCollectionAble(mapFilterSelectElements);
      mapFeaturesSelectElement.removeAttribute('disabled');
    },
    deactivate: function () {
      mapFiltersForm.reset();
      window.util.setCollectionDisabled(mapFilterSelectElements);
      mapFeaturesSelectElement.setAttribute('disabled', 'disabled');
    },
  };
})();
