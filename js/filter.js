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

  window.filter = {
    updateAds: function () {
      var filteredAds = window.page.data.slice();
      filteredAds = filteredAds.filter(function (it) {
        var booleanTypeMatch = type === it.offer.type || type === 'any';
        var priceNumber = it.offer.price;
        var isPriceMatch = price === toGradePrice(priceNumber) || price === 'any';
        var booleanRoomMatch = roomNumber === it.offer.rooms.toString() || roomNumber === 'any';
        var booleanGuestMatch = guestNumber === it.offer.guests.toString() || guestNumber === 'any';
        return booleanTypeMatch && booleanRoomMatch && booleanGuestMatch && isPriceMatch;
      });
      window.pin.addPinsElement(filteredAds);
    },
  };
})();
