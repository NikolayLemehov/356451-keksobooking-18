'use strict';

(function () {
  var ads = [];
  // var getRank = function (ad) {
  //   var rank = 0;
  //
  //   if (wizard.colorCoat === coatColor) {
  //     rank += 2;
  //   }
  //   if (wizard.colorEyes === eyesColor) {
  //     rank += 1;
  //   }
  //
  //   return rank;
  // };
  // var filterType = function () {
  //
  // };
  var housingTypeSelect = document.querySelector('#housing-type');
  housingTypeSelect.addEventListener('change', function () {
    // filterType();
  });
  window.filter = {
    ads: ads,
    updateAds: function () {
      window.pin.addPinsElement(this.ads);
    },
  };
})();
