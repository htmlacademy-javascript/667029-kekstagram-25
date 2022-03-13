import {PHOTO_COUNT} from './setup.js';
import {createPhotoList} from './data.js';

const picturesContainer = document.querySelector('.pictures.container');
const previewTemplate = document.querySelector('#picture').content.querySelector('.picture');
const preview = createPhotoList(PHOTO_COUNT);
const previewFragment = document.createDocumentFragment();

preview.forEach((picture) => {
  const previewElement = previewTemplate.cloneNode(true);
  previewElement.querySelector('.picture__img').src = picture.url;
  previewElement.querySelector('.picture__comments').textContent = picture.comments.length;
  previewElement.querySelector('.picture__likes').textContent = picture.likes;
  previewFragment.appendChild(previewElement);
});

picturesContainer.appendChild(previewFragment);
