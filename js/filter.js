'use strict';

(function () {
  var housingTypeSelect = document.querySelector('#housing-type');
  var type = housingTypeSelect.options[housingTypeSelect.selectedIndex].value;
  housingTypeSelect.addEventListener('change', function (evt) {
    evt.preventDefault();
    onTypeChange(housingTypeSelect.options[housingTypeSelect.selectedIndex].value);
  });
  var onTypeChange = function (filterType) {
    type = filterType;
    window.filter.updateAds();
  };
  window.filter = {
    updateAds: function () {
      var filteredAds = window.page.data.slice();
      filteredAds = filteredAds.filter(function (it) {
        if (type === 'any') {
          return true;
        }
        return it.offer.type === type;

      });
      window.pin.addPinsElement(filteredAds);
    },
  };
})();
