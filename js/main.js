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
Функция генерирует объект. Объект массива — описание фотографии, опубликованной пользователем.
Структура:
- id, число — идентификатор описания. Это число от 1 до 25. Идентификаторы не должны повторяться.
- url, строка — адрес картинки вида photos/{{i}}.jpg, где {{i}} — это число от 1 до 25. Адреса картинок не должны повторяться.
- description, строка — описание фотографии. Берётся из массива описаний.
- likes, число — количество лайков, поставленных фотографии. Случайное число от 15 до 200.
- comments, массив объектов — список комментариев, оставленных другими пользователями к этой фотографии. Количество комментариев к каждой фотографии - от 0 до 10. Данные в объектах генерируются случайным образом. 
*/

const ID = [
  1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,
];
const DESCRIPTION = [
  `Прекрасное изображение, отражает действительность`,
  `Повод призадуматься`,
  `Так видит мечты наш фотограф`,
  `Изобилие во всей красе`,
  `Вот так хочу!`,
  `Веселье в разгаре`,
];

function createPhoto () {
  const randomPhotoID = parseInt(ID.splice(getRandomInteger(0, ID.length - 1), 1));
  
  return {
    id: randomPhotoID,
    url: `photos/${randomPhotoID}.jpg`,
    description: DESCRIPTION[getRandomInteger(0, DESCRIPTION.length - 1)],
    likes: getRandomInteger(15, 200),
    comments: [],
  };
};

console.log(createPhoto());

/*
функция создаёт массив из 25 сгенерированных объектов.
*/

const photoList = Array.from({length: 25}, createPhoto);
