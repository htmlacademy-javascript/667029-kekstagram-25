/*
Функция получения данных с удаленного сервера.

Этапы работы:
1. Отправляет запрос по указанному адресу.
2. Если запрос на получение завершен успешно, извлекаем информацию из тела ответа сервера.
3. Если извлечение успешно, выполняем переданную параметром функцию с извлеченной информацией (в данном случае, отрисовываем превью фотографий)
*/
function getData (onSuccess, onFail) {
  fetch('https://25.javascript.pages.academy/kekstagram/data')
    .then((response) => response.json())
    .then((photos) => {
      onSuccess(photos);
    })
    .catch(() => {
      onFail();
    });
}

/*
Функция отправки данных на сервер.

Этапы работы:

*/
function sendData (onSuccess, onFail, body) {
  fetch(
    'https://25.javascript.pages.academy/kekstagram',
    {
      method: 'POST',
      body,
    },
  )
    .then(() => onSuccess())
    .catch(() => {
      onFail();
    });
}

export {getData, sendData};
