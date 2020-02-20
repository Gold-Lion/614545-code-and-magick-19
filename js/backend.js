'use strict';

(function () {
  var StatusCode = {
    OK: 200,
    NotFoud: 404
  };
  var UrlAddress = {
    POST: 'https://js.dump.academy/code-and-magick',
    GET: 'https://js.dump.academy/code-and-magick/data'
  };
  var TIMEOUT_IN_MS = 10000;

  var load = (onLoad, onError) => {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    xhr.addEventListener('load', () => {
      if (xhr.status === StatusCode.OK) {
        onLoad(xhr.response);
      } else if (xhr.status === StatusCode.NotFoud) {
        onError('Статус ошибки: ' + xhr.status + '. По указанному URL ничего не найденно!')
      } else {
        onError('Статус ошибки: ' + xhr.status + ' ' + xhr.statusText);
      }
    })

    xhr.addEventListener('error', () => {
      onError('Произошла ошибка соединения');
    })

    xhr.addEventListener('timeout', () => {
      onError('Ошибка. Запрос не успел выполниться за ' + xhr.timeout + ' мс. Пожалуйста перезагрузите страницу!');
    })

    xhr.timeout = TIMEOUT_IN_MS;

    xhr.open('GET', UrlAddress.GET);
    xhr.send();
  };

  var save = (data, onLoad, onError) => {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === StatusCode.OK) {
        onLoad(xhr.response);
      } else {
        onError('Статус ошибки: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.open('POST', UrlAddress.POST);
    xhr.send(data);
  };

  window.backend = {
    load,
    save
  };
})();
