const imageUploadForm = document.querySelector('.img-upload__form');
const uploadFileControl = document.querySelector('.img-upload__input');
const cancelUploadButton = document.querySelector('.img-upload__cancel');
const scaleControlInput = document.querySelector('.scale__control--value');
const effectLevelInput = document.querySelector('.effect-level__value');
const effectNoneInput = document.querySelector('#effect-none');
const hashtagsInput = document.querySelector('.text__hashtags');
const commentInput = document.querySelector('.text__description');

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
- событие статуса "не в фокусе" поля ввода комментария - разрешение закрытия окна при нажатии Esc.
*/
function renderImageUploadForm () {
  document.querySelector('.img-upload__overlay').classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');

  cancelUploadButton.addEventListener('click', closeImageUploadForm);
  document.addEventListener('keydown', closeByKeydown);
  imageUploadForm.addEventListener('submit', validateImageUploadForm);
  commentInput.addEventListener('focusin', cancelCloseByKeydown);
  commentInput.addEventListener('focusout', restoreCloseByKeydown);
  hashtagsInput.addEventListener('focusin', cancelCloseByKeydown);
  hashtagsInput.addEventListener('focusout', restoreCloseByKeydown);
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
- событие статуса "не в фокусе" поля ввода комментария - разрешение закрытия окна при нажатии Esc.
3. Сбрасываем значения полей ввода в форме.
*/
function closeImageUploadForm () {
  document.querySelector('.img-upload__overlay').classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');

  cancelUploadButton.removeEventListener('click', closeImageUploadForm);
  document.removeEventListener('keydown', closeByKeydown);
  imageUploadForm.removeEventListener('submit', validateImageUploadForm);
  commentInput.removeEventListener('focusin', cancelCloseByKeydown);
  commentInput.removeEventListener('focusout', restoreCloseByKeydown);
  hashtagsInput.removeEventListener('focusin', cancelCloseByKeydown);
  hashtagsInput.removeEventListener('focusout', restoreCloseByKeydown);

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
  if (evt.keyCode === 27) {
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
- один и тот же хэш-тег не может быть использован дважды.
В случае всех положительных проверок, завершаем валидацию с true.
Если хотя бы одна проверка отрицательная, завершаем валидацию с false.
*/
function validateHashtags () {
  let hashtagArray = hashtagsInput.value;

  hashtagArray = improveText(hashtagArray);

  if (hashtagArray === '') {
    return true;
  } else {
    hashtagArray = hashtagArray.split(' ');
    if (validateArrayLength(hashtagArray) && validateRegExp(hashtagArray) && hasNoDuplicateItem(hashtagArray)) {
      return true;
    } else {
      return false;
    }
  }
}

/*
Функция генерации ошибки валидации. Общая для всех пунктов проверки.
*/
function getHashtagsErrorMessage () {
  return 'Хештеги не валидные';
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
Функция проверки количества хештегов.
Если хештегов более 5, проверка не пройдена.
*/
function validateArrayLength (array) {
  if (array.length <= 5) {
    return true;
  } else {
    return false;
  }
}

/*
Функция проверки хештегов на соответствие маске ввода:
- хештег начинается с символа # (решётка);
- строка после решётки должна состоять из букв и чисел и не может содержать пробелы, спецсимволы (#, @, $ и т. п.), символы пунктуации (тире, дефис, запятая и т. п.), эмодзи и т. д.;
- хештег не может состоять только из одной решётки;
- максимальная длина одного хэш-тега 20 символов, включая решётку.
Если хештег не соответствует маске ввода, проверка не пройдена.
*/
function validateRegExp (array) {
  let count = 0;
  const regExp = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;
  for (let i = 0; i < array.length; i++) {
    if (!regExp.test(array[i])) {
      count++;
    }
  }
  if (count > 0) {
    return false;
  } else {
    return true;
  }
}

/*
Функция проверки повторяющихся хештегов.
Если обнаружен дубликат хештега, проверка не пройдена.
*/
function hasNoDuplicateItem (array) {
  let count = 0;
  for (let i = 0; i < array.length; i++) {
    for (let j = i + 1; j < array.length; j++) {
      if (array[i] === array [j]) {
        count++;
      }
    }
  }
  if (count > 0) {
    return false;
  } else {
    return true;
  }
}