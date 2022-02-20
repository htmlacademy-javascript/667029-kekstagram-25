/* Функция возвращает случайное целое число из переданного диапазона включительно.
Ожидаемый результат: случайное целое число из диапазона "от...до"
Диапазон может быть только положительный, включая ноль.
Обработать, как функция должна вести себя, если передать значение «до» меньшее, чем значение «от», или равное ему.

Этапы работы:
1. Получаем данные для функции.
*/
const lowerBound = 2;
const upperBound = 3.9;

/*
2. Проверяем, что число положительное или равно нулю.
- Если число НЕ "больше или равно нулю", то выводим в консоль сообщение об этом.
- Если число "больше или равно нулю", то ...
*/
function isPositive(number) {
  if (number < 0) {
    console.log(`Number ${number} is negative. Expected positive number or 0.`);
    return false;
  }
  return true;
}

/*
3. проверяем, что "до" больше, чем "от".
-- Если "до" меньше или равно "от", выводим в консоль сообщение об этом.
-- Если "до" больше, чем "от", то ...
*/
function isBigger(higherNumber, lowerNumber) {
  if (higherNumber <= lowerNumber) {
    console.log(`Upper bound ${higherNumber} <= lower bound ${lowerNumber}. Expected upper bound > lower bound.`);
    return false;
  }
  return true;
}

/*
4. вычисляем целое число из диапазона между "от" и "до".
*/
function getRandomInteger(lowerNumber, higherNumber) {
  return Math.floor(Math.random() * (Math.floor(higherNumber) - Math.ceil(lowerNumber) + 1)) + Math.ceil(lowerNumber);
}

/*
5. Если проверки пройдены, то высчитываем и выводим полученное число.
 */
let randomInteger;

if (isPositive(lowerBound) && isPositive(upperBound) && isBigger(upperBound, lowerBound)) {
  randomInteger = getRandomInteger(lowerBound, upperBound);
}

console.log(randomInteger);

/*
Функция для проверки максимальной длины строки. Будет использоваться для проверки длины введённого комментария,
но должна быть универсальна. Пример использования функции:

имя_функции(проверяемая_строка, максимальная_длина); // Результат: true, если строка проходит по длине,
и false — если не проходит

Этапы:
1.
2. Сравниваем длину проверяемой строки и указанную максимальную длину
- Если длина проверяемой строки больше указанной максимальной длины, выводим в консоль сообщение об этом и
возвращаем false.
- Если длина проверяемой строки меньше или равна указанной максимальной длине, возвращаем true.
*/

const checkingString = 'Hello!';
const maxLength = 50;

function isSizeSuitable(variable, limit) {
  if (variable.length > limit) {
    console.log(`Size is bigger than ${limit}`);
    return false;
  }
  return true;
}

isSizeSuitable(checkingString, maxLength);
