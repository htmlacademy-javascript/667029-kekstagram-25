import {previewList} from './preview.js';

/*
Функция добавляет возможность просмотра полноразмерного изображения для каждого из отрисованных объектов "Описание фотографии".

Этапы работы:
1. Получаем данные:
- массив элементов с превью изображений;
- элемент для просмотра полноразмерного изображения (модальное окно).
2. Добавляем каждому превью изображения в массиве обработчик событий: по клику на превью происходит вызов функции отрисовки окна с полноразмерным изображением объекта "Описание фотографии".
*/
const previewElements = document.querySelectorAll('.picture__img');
const fullPhotoContainer = document.querySelector('.big-picture');

function addFullViewHandler (previewElement, previewItem) {
  previewElement.addEventListener('click', () => {
    renderFullView(previewItem, fullPhotoContainer);
  });
}

for (let i = 0; i < previewElements.length; i++) {
  addFullViewHandler(previewElements[i], previewList[i]);
}

/*
Функция отрисовывает массив объектов "Комментарии к фотографии".
Шаблон разметки комментария:
<li class="social__comment">
    <img
        class="social__picture"
        src="{{аватар}}"
        alt="{{имя комментатора}}"
        width="35" height="35">
    <p class="social__text">{{текст комментария}}</p>
</li>

Этапы работы:
1. Обнуляем содержимое контейнера для отрисовки комментариев. **иначе он добавляет комментарии к ранее отрисованным
2. Создаем фрагмент.
3. Для каждого комментария создаем элемент согласно шаблону разметки.
4. Добавляем элемент во фрагмент.
5. Добавляем фрагмент в контейнер для отрисовки комментариев.
*/
function renderCommentList (list, container) {
  container.innerHTML = '';
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < list.length; i++) {
    const newCommentElement = document.createElement('li');
    newCommentElement.classList.add('social__comment');
    newCommentElement.innerHTML = `<img class="social__picture" src="${list[i].avatar}" alt="${list[i].name}" width="35" height="35"><p class="social__text">${list[i].message}</p>`;
    fragment.appendChild(newCommentElement);
  }
  container.appendChild(fragment);
}

/*
Функция отрисовывает окно с полноразмерным изображением одного из объектов "Описание фотографии".
Возможности для пользователя:
- просмотреть фотографию в полноразмерном режиме;
- поставить «лайк»; **в данный момент не реализвано
- почитать комментарии, оставленные другими пользователями.

Этапы работы:
1. Удаляем класс hidden у элемента .big-picture
2. Заполняем элемент .big-picture данными о конкретной фотографии:
- адрес изображения url подставляем как src изображения внутри блока .big-picture__img;
- количество лайков likes подставляем как текстовое содержание элемента .likes-count;
- количество комментариев comments подставляем как текстовое содержание элемента .comments-count;
- описание фотографии description вставляем строкой в блок .social__caption.
3. Получаем контейнер для отрисовки списка комментариев (блок .social__comments). Отрисовываем комментарии к фотографии.
4. Прячем блоки счётчика комментариев .social__comment-count и загрузки новых комментариев .comments-loader (добавляем им класс hidden).
5. Добавляем тегу <body> класс modal-open, чтобы контейнер с фотографиями позади не прокручивался при скролле. При закрытии окна не забудьте удалить этот класс.
6. Добавляем обработчик событий для закрытия окна. Условия срабатывания:
- нажатие клавиши Esc;
- клик по иконке закрытия окна.
*/
function renderFullView ({url, likes, comments, description}, container) {
  container.classList.remove('hidden');
  container.querySelector('.big-picture__img img').src = url;
  container.querySelector('.likes-count').textContent = likes;
  container.querySelector('.comments-count').textContent = comments.length;

  const commentContainer = fullPhotoContainer.querySelector('.social__comments');
  renderCommentList(comments, commentContainer);

  container.querySelector('.social__caption').textContent = description;
  container.querySelector('.social__comment-count').classList.add('hidden');
  container.querySelector('.comments-loader').classList.add('hidden');
  document.querySelector('body').classList.add('modal-open');

  const closeFullViewButton = container.querySelector('#picture-cancel');

  closeFullViewButton.addEventListener('click', () => {
    closeFullView(container);
  });

  document.addEventListener('keydown', (evt) => {
    if (evt.keyCode === 27) {
      closeFullView(container);
    }
  });
}

/*
Функция закрытия окна с полноразмерным изображением одного из объектов "Описание фотографии".

Этапы работы:
1. Удаляем у тега <body> класса modal-open;
2. Отображаем блоки счётчика комментариев .social__comment-count и загрузки новых комментариев .comments-loader (убираем у них класс hidden);
3. Добавляем класс hidden элементу .big-picture.
*/
function closeFullView (container) {
  document.querySelector('body').classList.remove('modal-open');
  container.querySelector('.social__comment-count').classList.remove('hidden');
  container.querySelector('.comments-loader').classList.remove('hidden');
  container.classList.add('hidden');
}
