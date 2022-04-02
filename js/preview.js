import {renderFullView} from './full-view.js';
import {photosFromServer} from './main.js';
import {getRandomInteger, debounce} from './utilitary.js';


const RENDER_DELAY = 500;
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

function renderDefaultPreviews () {
  const defaultList = photosFromServer.slice();
  //defaultList.sort(comparePreviews);
  const oldPreviews = document.querySelectorAll('a.picture');
  oldPreviews.forEach( (element) => element.remove() );

  renderPreviews(defaultList, previewTemplate, picturesContainer);
}

function renderRandomPreviews () {
  const rareList = photosFromServer.slice();
  const randomList = [];

  for (let i = 0; i < 10; i++) {
    const index = getRandomInteger(0, rareList.length - 1);
    randomList[i] = rareList[index];
    rareList.splice(index, 1);
  }

  const oldPreviews = document.querySelectorAll('a.picture');
  oldPreviews.forEach( (element) => element.remove() );

  renderPreviews(randomList, previewTemplate, picturesContainer);
}

function renderDiscussedPreviews () {
  const discussedList = photosFromServer.slice();
  discussedList.sort((a, b) => {
    if (a.comments > b.comments) {
      return -1;
    }
    if (a.comments < b.comments) {
      return 1;
    }

    return 0;
  });

  const oldPreviews = document.querySelectorAll('a.picture');
  oldPreviews.forEach( (element) => element.remove() );

  renderPreviews(discussedList, previewTemplate, picturesContainer);
}

const previewFilterElement = document.querySelector('.img-filters');
const defaultPreviewFilter = document.querySelector('#filter-default');
const randomPreviewFilter = document.querySelector('#filter-random');
const discussedPreviewFilter = document.querySelector('#filter-discussed');

function renderFilters() {
  previewFilterElement.classList.remove('img-filters--inactive');

  defaultPreviewFilter.addEventListener('click', debounce(
    renderDefaultPreviews,
    RENDER_DELAY,
  ));
  randomPreviewFilter.addEventListener('click', debounce(
    renderRandomPreviews,
    RENDER_DELAY,
  ));
  discussedPreviewFilter.addEventListener('click', debounce(
    renderDiscussedPreviews,
    RENDER_DELAY,
  ));
}

export {renderPreviews, renderFilters, previewTemplate, picturesContainer, fullPhotoContainer};

