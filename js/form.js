const ESCAPE_CODE = 27;
const SCALE_STEP = 25;
const MIN_SCALE = 25;
const MAX_SCALE = 100;
const imageUploadForm = document.querySelector('.img-upload__form');
const imageUploadFormOverlay = imageUploadForm.querySelector('.img-upload__overlay');
const imageFullPreview = imageUploadForm.querySelector('.img-upload__preview img');
const uploadFileControl = imageUploadForm.querySelector('.img-upload__input');
const cancelUploadButton = imageUploadForm.querySelector('.img-upload__cancel');
const scaleControlInput = imageUploadForm.querySelector('.scale__control--value');
const decreaseScaleButton = imageUploadForm.querySelector('.scale__control--smaller');
const increaseScaleButton = imageUploadForm.querySelector('.scale__control--bigger');
const effectLevelInput = imageUploadForm.querySelector('.effect-level__value');
const effectNoneInput = imageUploadForm.querySelector('#effect-none');
const hashtagsInput = imageUploadForm.querySelector('.text__hashtags');
const commentInput = imageUploadForm.querySelector('.text__description');

/*
Функция отрисовки окна загрузки и редактирования изображения.

Этапы работы:
1. Добавляем/удаляем классы у элементов:
- удаляем класс hidden у окна загрузки и редактирования изображения;
- добавляем тегу <body> класс modal-open.
2. Навешиваем обработчики событий:
- событие клика по кнопке-крестику - закрытие окна загрузки и редактирования изображения;
- событие нажатия кнопки Ecs - закрытие окна загрузки и редактирования изображения;
- событие отправки данных формы загрузки и редактирования изображения - валидация полей формы;
- событие статуса "в фокусе" поля ввода хештегов - запрет закрытия окна при нажатии Esc;
- событие статуса "не в фокусе" поля ввода хештегов - разрешение закрытия окна при нажатии Esc;
- событие статуса "в фокусе" поля ввода комментария - запрет закрытия окна при нажатии Esc;
- событие статуса "не в фокусе" поля ввода комментария - разрешение закрытия окна при нажатии Esc;
- событие клика по кнопке "-" - уменьшение размера изображения;
- событие клика по кнопке "+" - увеличение размера изображения.
*/
function renderImageUploadForm () {
  imageUploadFormOverlay.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');

  cancelUploadButton.addEventListener('click', closeImageUploadForm);
  document.addEventListener('keydown', closeByKeydown);
  imageUploadForm.addEventListener('submit', validateImageUploadForm);
  commentInput.addEventListener('focusin', cancelCloseByKeydown);
  commentInput.addEventListener('focusout', restoreCloseByKeydown);
  hashtagsInput.addEventListener('focusin', cancelCloseByKeydown);
  hashtagsInput.addEventListener('focusout', restoreCloseByKeydown);
  decreaseScaleButton.addEventListener('click', decreaseScale);
  increaseScaleButton.addEventListener('click', increaseScale);
}

/*
Функция закрытия окна загрузки и редактирования изображения.

Этапы работы:
1. Добавляем/удаляем классы у элементов:
- добавляем класс hidden окну загрузки и редактирования изображения;
- удаляем у тега <body> класс modal-open.
2. Удаляем обработчики событий:
- событие клика по кнопке-крестику - закрытие окна загрузки и редактирования изображения;
- событие нажатия кнопки Ecs - закрытие окна загрузки и редактирования изображения;
- событие отправки данных формы загрузки и редактирования изображения - валидация полей формы;
- событие статуса "в фокусе" поля ввода хештегов - запрет закрытия окна при нажатии Esc;
- событие статуса "не в фокусе" поля ввода хештегов - разрешение закрытия окна при нажатии Esc;
- событие статуса "в фокусе" поля ввода комментария - запрет закрытия окна при нажатии Esc;
- событие статуса "не в фокусе" поля ввода комментария - разрешение закрытия окна при нажатии Esc;
- событие клика по кнопке "-" - уменьшение размера изображения;
- событие клика по кнопке "+" - увеличение размера изображения.
3. Сбрасываем значения полей ввода в форме.
*/
function closeImageUploadForm () {
  imageUploadFormOverlay.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');

  cancelUploadButton.removeEventListener('click', closeImageUploadForm);
  document.removeEventListener('keydown', closeByKeydown);
  imageUploadForm.removeEventListener('submit', validateImageUploadForm);
  commentInput.removeEventListener('focusin', cancelCloseByKeydown);
  commentInput.removeEventListener('focusout', restoreCloseByKeydown);
  hashtagsInput.removeEventListener('focusin', cancelCloseByKeydown);
  hashtagsInput.removeEventListener('focusout', restoreCloseByKeydown);
  decreaseScaleButton.removeEventListener('click', decreaseScale);
  increaseScaleButton.removeEventListener('click', increaseScale);

  uploadFileControl.value = '';
  scaleControlInput.value = '100%';
  effectLevelInput.value = '';
  effectNoneInput.checked = true;
  hashtagsInput.value = '';
  commentInput.value = '';
}

/*
Функция закрытия по нажатию клавиши.

Если нажат Esc, закрывается окно загрузки и редактирования изображения.
*/
function closeByKeydown (evt) {
  if (evt.keyCode === ESCAPE_CODE) {
    closeImageUploadForm();
  }
}

/*
Функция запрета закрытия окна загрузки и редактирования изображения при нажатии Esc.
*/
function cancelCloseByKeydown () {
  document.removeEventListener('keydown', closeByKeydown);
}

/*
Функция разрешения закрытия окна загрузки и редактирования изображения при нажатии Esc.
*/
function restoreCloseByKeydown () {
  document.addEventListener('keydown', closeByKeydown);
}

/*
Навешиваем обработчик события выбора изображения (изменения значения поля #upload-file) - отрисовка окна загрузки и редактирования изображения.
*/
uploadFileControl.addEventListener('change', renderImageUploadForm);

/*
Добавляем валидацию поля ввода хештегов.

1. Устанавливаем настройки валидации. Если поля ввода будут невалидны, в элемент с классом upload-image__validate будет добавлен div с классом img-upload__error-text и описанием ошибки, допущенной пользователем.
2. Добавляем валидатор для библиотеки Pristine. Если поле ввода с id="text__hashtags" не пройдет валидацию по инструкциям функции validateHashtags, в div с классом img-upload__error-text появится описание ошибки (результат работы функции getHashtagsErrorMessage).
*/
const pristine = new Pristine(imageUploadForm, {
  classTo: 'upload-image__validate',
  errorTextParent: 'upload-image__validate',
  errorTextTag: 'div',
  errorTextClass: 'img-upload__error-text',
});

pristine.addValidator(document.querySelector('#text__hashtags'), validateHashtags, getHashtagsErrorMessage);

/*
Общая функция валидации поля ввода хештегов.

Этапы работы:
1. Получаем текстовое содержимое поля ввода хештегов.
2. Производим черновую обработку текстового содержимого.
3. Проверяем, пустое ли поле ввода хештегов.
- если поле пустое, завершаем валидацию с true;
- если поле непустое, ...
4. Превращаем текст со списком хештегов в массив.
5. Проверяем массив хештегов:
- число хештегов - не более 5;
- написание хештега соответствует маске ввода;
- отсутствуют дубли хештегов.
В случае всех положительных проверок, завершаем валидацию с true.
Если хотя бы одна проверка отрицательная, завершаем валидацию с false.
*/
function validateHashtags () {
  let hashtagArray = hashtagsInput.value;

  hashtagArray = improveText(hashtagArray);

  if (hashtagArray === '') {
    return true;
  }

  hashtagArray = hashtagArray.split(' ');

  const isArrayLengthValid = validateArrayLength(hashtagArray);
  const isRegExpValid = validateRegExp(hashtagArray);
  const hasNoDuplicates = hasNoDuplicateItem(hashtagArray);
  const validateResult = isArrayLengthValid && isRegExpValid && hasNoDuplicates;
  return validateResult;
}

/*
Функция генерации ошибки валидации. Общая для всех пунктов проверки.
*/
function getHashtagsErrorMessage () {
  return 'Хештеги начинаются с решетки. Могут содержать только буквы и числа. Хештегов не более 5. Регистр не важен. Повторять хештеги нельзя.';
}

/*
Функция проверки полей ввода формы добавления изображения перед отправкой данных на сервер. Если содержимое полей ввода не валидно, данные нельзя отправить на сервер.
Производит черновую обработку содержимого поля ввода хештегов перед отправкой на сервер.
*/
function validateImageUploadForm (evt) {
  if (!pristine.validate()) {
    evt.preventDefault();
  }
  hashtagsInput.value = improveText(hashtagsInput.value);
}

/*
Функция черновой обработчки текстового содержимого поля ввода.

Этапы работы:
1. Приводим к нижнему регистру.
2. Обрезаем пробелы до и после текста.
3. Удаляем повторяющиеся пробелы между словами.
*/
function improveText (text) {
  text = text.toLowerCase();
  text = text.trim();
  for (let i = 1; i < text.length; i++) {
    text = text.replace('  ',' ');
  }
  return text;
}

/*
Функция проверки количества хештегов в массиве.
Если хештегов более 5, проверка не пройдена.
*/
function validateArrayLength (array) {
  return array.length <= 5;
}

/*
Функция проверки соответствия массива хештегов маске ввода.
Если хотя бы один хештег из массива не соответствует маске ввода, проверка не пройдена.
*/
function validateRegExp (array) {
  return array.every(isMatchRegExp);
}

/*
Функция проверки строки на соответствие условиям маски ввода:
- начинается с символа # (решётка);
- строка после решётки должна состоять из букв и чисел и не может содержать пробелы, спецсимволы (#, @, $ и т. п.), символы пунктуации (тире, дефис, запятая и т. п.), эмодзи и т. д.;
- не может состоять только из одной решётки;
- максимальная длина 20 символов, включая решётку.
*/
function isMatchRegExp (arrayItem) {
  const regExp = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;
  return regExp.test(arrayItem);
}

/*
Функция проверки дубликатов хештегов в массиве.
Если обнаружен дубликат хештега, проверка не пройдена.
*/
function hasNoDuplicateItem (array) {
  return !(array.some(hasDuplicate));
}

/*
Функция проверки повторяющихся элементов в массиве.

Этапы работы:
1. Копируем массив в переменную, сортируем массив.
2. Сравниваем соседние элементы в массиве:
- если элементы одинаковые, завершаем проверку с true;
- в обратном случае, завершаем проверку с false.
*/
function hasDuplicate (array) {
  const workArray = array.slice().sort();

  for (let i = 0; i < workArray.length; i++) {
    if (workArray[i] === workArray[i + 1]) {
      return true;
    }
  }

  return false;
}

/*
Функция уменьшения размера.

Этапы работы:
1. Вычисляем текущее значение размера изображения в поле ввода.
2. Сравниваем значение с минимальным:
- если значение минимальное, то ничего не происходит;
- если значение больше минимального, то ...
3. Уменьшаем значение размера на величину шага.
4. Обновляем значение размера изображения в поле ввода.
5. Изменяем непосредственно размер изображения согласно новому значению.
*/
function decreaseScale () {
  let scale = parseInt(scaleControlInput.value, 10);
  if (scale > MIN_SCALE) {
    scale -= SCALE_STEP;
    scaleControlInput.value = `${scale}%`;
    changeImageScale (scale);
  }
}

/*
Функция увеличения размера.

Этапы работы:
1. Вычисляем текущее значение размера изображения в поле ввода.
2. Сравниваем значение с максимальным:
- если значение максимальное, то ничего не происходит;
- если значение меньше максимального, то ...
3. Увеличиваем значение размера на величину шага.
4. Обновляем значение размера изображения в поле ввода.
5. Изменяем непосредственно размер изображения согласно новому значению.
*/
function increaseScale () {
  let scale = parseInt(scaleControlInput.value, 10);
  if (scale < MAX_SCALE) {
    scale += SCALE_STEP;
    scaleControlInput.value = `${scale}%`;
    changeImageScale (scale);
  }
}

/*
Функция изменения размера изображения.
Добавляет стиль CSS, который с помощью трансформации scale задаёт масштаб.
*/
function changeImageScale (imageScale) {
  imageFullPreview.style.transform = `scale(${imageScale/100})`;
}
