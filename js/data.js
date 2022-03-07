import {PHOTO_COUNT} from './setup.js';
import {getRandomInteger} from './utilitary.js';

/*
Функция создает объект - комментарий к фотографии.
Структура:
- id — случайное число. Идентификаторы не должны повторяться.
- avatar — строка, значение которой формируется по правилу img/avatar-{{случайное число от 1 до 6}}.svg.
- message — строка, ее значение - одно или два случайных предложения из массива сообщений.
- name - строка, ее значение - одно случайное из массива имён.

Этапы работы:
1. Получаем данные для функции.
2. Из массива ID комментариев извлекаем ID для использования в создаваемом объекте - комментарии.
3. Создаем объект - комментарий.
*/
const COMMENT_MESSAGE = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];
const COMMENT_NAME = [
  'Володя',
  'Михаил',
  'Артём',
  'Саша',
  'Георгий',
  'Мария',
  'Таня',
  'Вероника',
];
const commentList = [];

function createComment () {
  return {
    id: commentList.length + 1,
    avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
    message: COMMENT_MESSAGE[getRandomInteger(0, COMMENT_MESSAGE.length - 1)],
    name: COMMENT_NAME[getRandomInteger(0, COMMENT_NAME.length - 1)],
  };
}

/*
функция создаёт массив из 1 .. 3 объектов - комментариев к фотографии.
*/
function createCommentList (count) {
  const pictureCommentList = [];

  for (let i = 0; i < count; i++) {
    const result = createComment();
    commentList.push(result);
    pictureCommentList.push(result);
  }

  return pictureCommentList;
}

/*
Функция создаёт объект — описание фотографии, опубликованной пользователем.
Структура:
- id, число — идентификатор описания. Это число от 1 до 25. Идентификаторы не должны повторяться.
- url, строка — адрес картинки вида photos/{{i}}.jpg, где {{i}} — это число от 1 до 25. Адреса картинок не должны повторяться.
- description, строка — описание фотографии. Берётся из массива описаний.
- likes, число — количество лайков, поставленных фотографии. Случайное число от 15 до 200.
- comments, массив объектов — список комментариев, оставленных другими пользователями к этой фотографии. Количество комментариев к каждой фотографии - от 0 до 3.

Этапы работы:
1. Получаем данные для функции.
2. Из массива ID функций извлекаем ID для использования в создаваемом объекте - описании фотографии.
3. Создаем объект - описание фотографии.
*/
const PHOTO_ID = Array.from({length: PHOTO_COUNT}, (v, k) => k);
const PHOTO_DESCRIPTION = [
  'Прекрасное изображение, отражает действительность',
  'Повод призадуматься',
  'Так видит мечты наш фотограф',
  'Изобилие во всей красе',
  'Вот так хочу!',
  'Веселье в разгаре',
];
const photoList = [];

function createPhoto (index) {
  return {
    id: index + 1,
    url: `photos/${index + 1}.jpg`,
    description: PHOTO_DESCRIPTION[getRandomInteger(0, PHOTO_DESCRIPTION.length - 1)],
    likes: getRandomInteger(15, 200),
    comments: createCommentList(getRandomInteger(1, 3)),
  };
}

/*
функция создаёт массив из указанного в настройках количества объектов - описаний фотографии.
*/
function createPhotoList (count) {

  for (let i = 0; i < count; i++) {
    photoList.push(createPhoto(PHOTO_ID[i]));
  }
  return photoList;
}

export {createPhotoList};
