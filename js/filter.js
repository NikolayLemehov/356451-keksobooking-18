'use strict';

(function () {
  var AD_LIMIT = 5;
  window.filter = function (data) {
    var filteredData = data.slice();
    return filteredData.slice(0, AD_LIMIT);
  };
})();
