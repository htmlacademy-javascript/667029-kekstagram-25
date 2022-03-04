/* Функция возвращает случайное целое число из переданного диапазона включительно.
Ожидаемый результат: случайное целое число из диапазона "от...до"
Диапазон может быть только положительный, включая ноль.
Обработать, как функция должна вести себя, если передать значение «до» меньшее, чем значение «от», или равное ему.

Этапы работы:
1. Получаем данные для функции.
*/
const lowerBound = 2;
const upperBound = 11;

/*
2. Проверяем, что число положительное или равно нулю:
- Если число НЕ "больше или равно нулю", то выводим в консоль сообщение об этом.
- Если число "больше или равно нулю", то ...
*/
function isPositive(number) {
  if (number < 0) {
    throw new Error(`Number ${number} is negative. Expected positive number or 0.`);
  }
  return true;
}

/*
3. Проверяем, что "до" больше, чем "от":
- Если "до" меньше или равно "от", выводим в консоль сообщение об этом.
- Если "до" больше, чем "от", то ...
*/
function isBigger(higherNumber, lowerNumber) {
  if (higherNumber <= lowerNumber) {
    throw new Error(`Upper bound ${higherNumber} <= lower bound ${lowerNumber}. Expected upper bound > lower bound.`);
  }
  return true;
}

/*
4. Если проверки пройдены, то вычисляем целое число из диапазона между "от" и "до".
*/
function getRandomInteger(lowerNumber, higherNumber) {
  if (isPositive(lowerNumber) && isPositive(higherNumber) && isBigger(higherNumber, lowerNumber)) {
    return Math.floor(Math.random() * (Math.floor(higherNumber) - Math.ceil(lowerNumber) + 1)) + Math.ceil(lowerNumber);
  }
  throw new Error('Function getRandomInteger - validation error ');
}

getRandomInteger(lowerBound, upperBound);

/*
Функция проверяет максимальную длину строки. Должна быть универсальна.
Пример использования функции: имя_функции(проверяемая_строка, максимальная_длина).
Ожидаемый результат: true, если строка проходит по длине, и false — если не проходит.

Этапы работы:
1. Получаем данные для функции.
2. Сравниваем длину проверяемой строки и указанную максимальную длину:
- Если длина проверяемой строки больше указанной максимальной длины, выводим сообщение об ошибке.
- Если длина проверяемой строки меньше или равна указанной максимальной длине, возвращаем true.
*/

const checkingString = 'Hello!';
const maxLength = 14;

function isSizeSuitable(variable, limit) {
  if (variable.length > limit) {
    throw new Error(`Size is bigger than ${limit}`);
  }
}

isSizeSuitable(checkingString, maxLength);

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

const PHOTO_COUNT = 25;
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
функция создаёт массив из 25 объектов - описаний фотографии.
*/

function createPhotoList (count) {
  for (let i = 0; i < count; i++) {
    photoList.push(createPhoto(PHOTO_ID[i]));
  }
  return photoList;
}

createPhotoList(PHOTO_COUNT);
