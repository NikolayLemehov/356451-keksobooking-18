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

  window.filter = {
    updateAds: function () {
      var filteredAds = window.page.data.slice();
      filteredAds = filteredAds.filter(function (it) {
        var isTypeMatch = type === it.offer.type || type === 'any';
        var isRoomMatch = roomNumber === it.offer.rooms.toString() || roomNumber === 'any';
        var isGuestMatch = guestNumber === it.offer.guests.toString() || guestNumber === 'any';
        return isTypeMatch && isRoomMatch && isGuestMatch;
      });
      window.pin.addPinsElement(filteredAds);
    },
  };
})();
