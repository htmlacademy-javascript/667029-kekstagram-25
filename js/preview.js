import {PHOTO_COUNT} from './setup.js';
import {createPhotoList} from './data.js';

const picturesContainer = document.querySelector('.pictures.container');
const previewTemplate = document.querySelector('#picture').content.querySelector('.picture');
const previewList = createPhotoList(PHOTO_COUNT);

function renderPreviews (list, template, container) {
  const previewFragment = document.createDocumentFragment();

  list.forEach((picture) => {
    const previewElement = template.cloneNode(true);
    previewElement.querySelector('.picture__img').src = picture.url;
    previewElement.querySelector('.picture__comments').textContent = picture.comments.length;
    previewElement.querySelector('.picture__likes').textContent = picture.likes;
    previewFragment.appendChild(previewElement);
  });

  container.appendChild(previewFragment);
  return container;
}

renderPreviews(previewList, previewTemplate, picturesContainer);
