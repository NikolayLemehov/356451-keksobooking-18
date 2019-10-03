'use strict';

(function () {
  window.backend = {
    load: function (onSuccess, onError) {
      var URL = 'https://js.dump.academy/keksobooking/data';
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        if (xhr.status === 200) {
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

      xhr.timeout = 2000; // 2s

      xhr.open('GET', URL);
      xhr.send();
    },
    // save: function (data, onSuccess) {
    //   var URL = 'https://js.dump.academy/code-and-magick';
    //   var xhr = new XMLHttpRequest();
    //   xhr.responseType = 'json';
    //
    //   xhr.addEventListener('load', function () {
    //     onSuccess(xhr.response);
    //   });
    //
    //   xhr.open('POST', URL);
    //   xhr.send(data);
    // },
  };
})();
