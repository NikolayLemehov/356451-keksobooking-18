'use strict';

(function () {
  var doPerChangeFilterAd = function () {
    if (window.card.isShowCard) {
      window.card.hidePinCard(window.card.indexShowCard);
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
      case (priceNumber < 10000):
        return 'low';
      case (priceNumber >= 10000 && priceNumber <= 50000):
        return 'middle';
      case (priceNumber > 50000):
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

  var presenceFeature = [];
  var featuresElements = document.querySelectorAll('#housing-features input[name="features"]');
  featuresElements.forEach(function (checkbox) {
    var feature = checkbox.getAttribute('value');
    if (checkbox.checked) {
      presenceFeature.push(feature);
    }
    checkbox.addEventListener('change', function () {
      onFeaturesChange(feature, checkbox.checked);
    });
  });
  var onFeaturesChange = function (feature, presence) {
    if (presence) {
      presenceFeature.push(feature);
    } else {
      var index = presenceFeature.indexOf(feature);
      presenceFeature.splice(index, 1);
    }
    doPerChangeFilterAd();
  };
  var isFeatures = function (dataFeatures) {
    var booleanFit = true;
    presenceFeature.forEach(function (feature) {
      booleanFit = booleanFit && !!dataFeatures.find(function (it) {
        return feature === it;
      });
    });
    return booleanFit;
  };

  window.filter = {
    updateAds: function () {
      var filteredAds = window.page.data.slice();
      filteredAds = filteredAds.filter(function (it) {
        var features = it.offer.features;
        var booleanTypeMatch = type === it.offer.type || type === 'any';
        var priceNumber = it.offer.price;
        var isPriceMatch = price === toGradePrice(priceNumber) || price === 'any';
        var booleanRoomMatch = roomNumber === it.offer.rooms.toString() || roomNumber === 'any';
        var booleanGuestMatch = guestNumber === it.offer.guests.toString() || guestNumber === 'any';
        return booleanTypeMatch && booleanRoomMatch && booleanGuestMatch && isPriceMatch && isFeatures(features);
      });
      window.pin.addPinsElement(filteredAds);
    },
  };
})();
