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
*/

const COMMENT_ID = [
  1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,
];
const COMMENT_MESSAGE = [
  `Всё отлично!`,
  `В целом всё неплохо. Но не всё.`,
  `Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.`,
  `Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.`,
  `Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.`,
  `Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!`,
];
const COMMENT_NAME = [
  `Володя`,
  `Михаил`,
  `Артём`,
  `Саша`,
  `Георгий`,
  `Мария`,
  `Таня`,
  `Вероника`,
];

function createComment () {
  const randomCommentID = parseInt(COMMENT_ID.splice(getRandomInteger(0, COMMENT_ID.length - 1), 1));

  return {
    id: randomCommentID,
    avatar: `img/avatar-` + getRandomInteger(1, 6) + `.svg`,
    message: COMMENT_MESSAGE[getRandomInteger(0, COMMENT_MESSAGE.length - 1)],
    name: COMMENT_NAME[getRandomInteger(0, COMMENT_NAME.length - 1)],
  };
};

console.log(createComment());

/*
функция создаёт массив из 0 .. 3 объектов - комментариев к фотографии.
*/

const commentList = Array.from({length: getRandomInteger(0, 3)}, createComment);
console.log(commentList);

/*
Функция создаёт объект — описание фотографии, опубликованной пользователем.
Структура:
- id, число — идентификатор описания. Это число от 1 до 25. Идентификаторы не должны повторяться.
- url, строка — адрес картинки вида photos/{{i}}.jpg, где {{i}} — это число от 1 до 25. Адреса картинок не должны повторяться.
- description, строка — описание фотографии. Берётся из массива описаний.
- likes, число — количество лайков, поставленных фотографии. Случайное число от 15 до 200.
- comments, массив объектов — список комментариев, оставленных другими пользователями к этой фотографии. Количество комментариев к каждой фотографии - от 0 до 3. 
*/

const PHOTO_ID = [
  1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,
];
const PHOTO_DESCRIPTION = [
  `Прекрасное изображение, отражает действительность`,
  `Повод призадуматься`,
  `Так видит мечты наш фотограф`,
  `Изобилие во всей красе`,
  `Вот так хочу!`,
  `Веселье в разгаре`,
];

function createPhoto () {
  const randomPhotoID = parseInt(PHOTO_ID.splice(getRandomInteger(0, PHOTO_ID.length - 1), 1));
  
  return {
    id: randomPhotoID,
    url: `photos/${randomPhotoID}.jpg`,
    description: PHOTO_DESCRIPTION[getRandomInteger(0, PHOTO_DESCRIPTION.length - 1)],
    likes: getRandomInteger(15, 200),
    comments: commentList,
  };
};

console.log(createPhoto());

/*
функция создаёт массив из 25 объектов - описаний фотографии.
*/

const photoList = Array.from({length: 25}, createPhoto);
console.log(photoList);
