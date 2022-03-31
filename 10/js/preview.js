import {renderFullView} from './full-view.js';

/*
Функция отрисовывает превью изображений для массива объектов "Описание фотографии". Функция добавляет возможность просмотра полноразмерного изображения для каждого из отрисованных объектов "Описание фотографии".

Этапы работы:
1. Получаем данные, которые будем использовать в качестве параметров:
- контейнер, в котором будут отрисованы превью изображений;
- содержимое шаблона (разметка) для превью изображения;
- окно с полноразмерным изображением объекта "Описание фотографии".
2. Создаем фрагмент.
3. Для каждого объекта "Описание фотографии":
- создаём новый элемент (клонируем разметку шаблона);
- адрес изображения url подставляем как атрибут src изображения;
- количество комментариев comments выводим в блок .picture__comments.;
- количество лайков likes выводим в блок .picture__likes;
- добавляем элемент во фрагмент;
- добавляем элементу обработчик событий по клику на превью - вызов функции отрисовки окна с полноразмерным изображением объекта "Описание фотографии".
4. Добавляем фрагмент с элементами "Превью изображения" в контейнер.
*/
const picturesContainer = document.querySelector('.pictures.container');
const previewTemplate = document.querySelector('#picture').content.querySelector('.picture');
const fullPhotoContainer = document.querySelector('.big-picture');

function renderPreviews (list, template, container) {
  const previewFragment = document.createDocumentFragment();

  list.forEach(({url, likes, comments, description}) => {
    const previewElement = template.cloneNode(true);
    previewElement.querySelector('.picture__img').src = url;
    previewElement.querySelector('.picture__comments').textContent = comments.length;
    previewElement.querySelector('.picture__likes').textContent = likes;
    previewFragment.appendChild(previewElement);

    previewElement.addEventListener('click', () => {
      renderFullView({url, likes, comments, description}, fullPhotoContainer);
    });
  });

  container.appendChild(previewFragment);
  return container;
}

export {renderPreviews, previewTemplate, picturesContainer, fullPhotoContainer};
