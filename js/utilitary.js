import {isPositive, isBigger} from './check.js';

const ESCAPE_CODE = 27;
const MESSAGE_SHOW_TIME = 5000;

/*
Функция показывает сообщение об ошибке загрузки данных с удаленного сервера.
Текст сообщения передается параметром.

Этапы работы:
1. Создаём элемент для сообщения об ошибке.
2. Задаём ему стили (ТЗ на стили нет).
3. Заполняем содержимое элемента текстом сообщения.
4. Добавляем элемент на страницу.
5. Устанавливаем таймер, засекаем указанное время. Когда время выйдет, элемент будет удалён.
*/
function showDownloadMessage (message) {
  const errorElement = document.createElement('div');

  errorElement.classList.add('download-error-text');
  errorElement.textContent = message;

  document.body.append(errorElement);

  setTimeout(() => {
    errorElement.remove();
  }, MESSAGE_SHOW_TIME);
}

/*
Функция показывает сообщения об отправке данных на сервер.
Тип сообщения (например, "завершено успешно" или "завершено с ошибкой") передается параметром.
Шаблон сообщения для каждого типа передается параметром.
Контейнер для вставки сообщения на странице передается параметром.

Этапы работы:
1. Создаем фрагмент для вставки сообщения.
2. Создаем элемент-сообщение и наполняем его согласно шаблону сообщения.
3. Получаем кнопку закрытия сообщения.
4. Добавляем элемент-сообщение во фрагмент для вставки сообщения.
5. Добавляем фрагмент в контейнер для вставки сообщения на странице.
6. Добавляем обработчик событий для закрытия сообщения (условие срабатывания - нажатие клавиши Esc).
7. Добавляем обработчик событий для закрытия сообщения (условие срабатывания - клик по любому месту в окне вне сообщения).
8. Добавляем обработчик событий для закрытия сообщения (условие срабатывания - клик по кнопке в сообщении).
*/
function showUploadMessage (category, template, container) {
  const uploadFragment = document.createDocumentFragment();
  const uploadElement = template.cloneNode(true);
  const closeMessageButton = uploadElement.querySelector(`.${category}__button`);

  uploadFragment.appendChild(uploadElement);
  container.appendChild(uploadFragment);

  document.addEventListener('keydown', closeMessageByKeydown);
  document.addEventListener('click', closeMessageByClick);
  closeMessageButton.addEventListener('click', closeUploadMessage);
}

/*
Функция закрытия сообщения об отправке данных на сервер при клике по любому месту в окне вне сообщения.
*/

function closeMessageByClick (evt) {
  if (evt.target.matches('.success') || evt.target.matches('.error')) {
    closeUploadMessage();
  }
}

/*
Функция закрытия сообщения об отправке данных на сервер при нажатии клавиши Esc.
*/
function closeMessageByKeydown (evt) {
  if (evt.keyCode === ESCAPE_CODE) {
    closeUploadMessage();
  }
}

/*
Функция закрытия сообщения об отправке данных на сервер.

Этапы работы:
1. Удаляем обработчик событий для закрытия сообщения (условие срабатывания - нажатие клавиши Esc).
2. Удаляем обработчик событий для закрытия сообщения (условие срабатывания - клик по любому месту в окне вне сообщения).
3. Удаляем на странице элемент-сообщение (при создании он добавлялся последним в body).
*/
function closeUploadMessage () {
  document.removeEventListener('keydown', closeMessageByKeydown);
  document.removeEventListener('click', closeMessageByClick);
  document.body.lastChild.remove();
}

/* Функция возвращает случайное целое число из переданного диапазона включительно.
Ожидаемый результат: случайное целое число из диапазона "от...до"
Диапазон может быть только положительный, включая ноль.
Обработать, как функция должна вести себя, если передать значение «до» меньшее, чем значение «от», или равное ему.

Если проверки пройдены, то вычисляется целое число из диапазона между "от" и "до".
*/
function getRandomInteger(lowerNumber, higherNumber) {
  if (isPositive(lowerNumber) && isPositive(higherNumber) && isBigger(higherNumber, lowerNumber)) {
    return Math.floor(Math.random() * (Math.floor(higherNumber) - Math.ceil(lowerNumber) + 1)) + Math.ceil(lowerNumber);
  }
  throw new Error('Function getRandomInteger - validation error ');
}

function debounce (callback, timeoutDelay = 500) {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(callback, timeoutDelay, ...rest);
  };
}

export {showDownloadMessage, showUploadMessage, getRandomInteger, debounce, ESCAPE_CODE};
