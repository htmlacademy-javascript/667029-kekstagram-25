import {renderPreviews, previewTemplate, picturesContainer, renderFilters} from './preview.js';
import './form.js';
import {getData} from './api.js';
import {showDownloadMessage} from './utilitary.js';

let photosFromServer;
/*
Вызываем функцию загрузки данных с удаленного сервера.
В случае успеха загрузки данных отрисовываем превью фотографий пользователей.
В случае ошибки загрузки данных показываем сообщение об ошибке.
*/
getData(
  (photos) => {
    renderPreviews(photos, previewTemplate, picturesContainer);
    photosFromServer = photos;
  },
  () => {
    showDownloadMessage('Не удалось получить данные. Попробуйте ещё раз');
  }
);

renderFilters();

export {photosFromServer};
