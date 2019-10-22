'use strict';

(function () {
  var SUCCESS_CODE = 200;
  var TIME_WITHOUT_ERROR = 2000;
  var addServerListener = function (xhr, onSuccess, onError) {
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      if (xhr.status === SUCCESS_CODE) {
        onSuccess(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });
    xhr.timeout = TIME_WITHOUT_ERROR;
  };
  window.backend = {
    load: function (onSuccess, onError) {
      var URL = 'https://js.dump.academy/keksobooking/data';
      var xhr = new XMLHttpRequest();
      addServerListener(xhr, onSuccess, onError);
      xhr.open('GET', URL);
      xhr.send();
    },
    save: function (data, onSuccess, onError) {
      var URL = 'https://js.dump.academy/keksobooking';
      var xhr = new XMLHttpRequest();
      addServerListener(xhr, onSuccess, onError);
      xhr.open('POST', URL);
      xhr.send(data);
    },
  };
})();
