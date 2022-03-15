import {PHOTO_COUNT} from './setup.js';
import {createPhotoList} from './data.js';

/*
Функция отрисовывает список элементов "Превью изображения" для массива объектов "Описание фотографии".

Этапы работы:
1. Получаем данные, которые будем использовать в качестве параметров:
- элемент на странице ("контейнер"), в котором будет отрисован список элементов "Превью изображения";
- содержимое шаблона (разметка) для элемента "Превью изображения";
- массив объектов "Описание фотографии".
2. Создаем фрагмент.
3. Для каждого объекта "Описание фотографии":
- создаём новый элемент (клонируем разметку шаблона);
- адрес изображения url подставляем как атрибут src изображения;
- количество лайков likes выводим в блок .picture__likes;
- количество комментариев comments выводим в блок .picture__comments.;
- добавляем элемент во фрагмент.
4. Добавляем фрагмент с созданными элементами "Превью изображения" в "контейнер".
*/
const picturesContainer = document.querySelector('.pictures.container');
const previewTemplate = document.querySelector('#picture').content.querySelector('.picture');
const previewList = createPhotoList(PHOTO_COUNT);

function renderPreviews (list, template, container) {
  const previewFragment = document.createDocumentFragment();

  list.forEach(({url, comments, likes}) => {
    const previewElement = template.cloneNode(true);
    previewElement.querySelector('.picture__img').src = url;
    previewElement.querySelector('.picture__comments').textContent = comments.length;
    previewElement.querySelector('.picture__likes').textContent = likes;
    previewFragment.appendChild(previewElement);
  });

  container.appendChild(previewFragment);
  return container;
}

renderPreviews(previewList, previewTemplate, picturesContainer);

export {previewList};
