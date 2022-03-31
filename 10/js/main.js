import {renderPreviews, previewTemplate, picturesContainer} from './preview.js';
import './form.js';
import {getData} from './api.js';
import {showDownloadMessage} from './utilitary.js';

/*
Вызываем функцию загрузки данных с удаленного сервера.
В случае успеха загрузки данных отрисовываем превью фотографий пользователей.
В случае ошибки загрузки данных показываем сообщение об ошибке.
*/
getData(
  (photos) => {
    renderPreviews(photos, previewTemplate, picturesContainer);
  },
  () => {
    showDownloadMessage('Не удалось получить данные. Попробуйте ещё раз');
  }
);
