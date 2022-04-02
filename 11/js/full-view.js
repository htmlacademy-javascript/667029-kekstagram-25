import {ESCAPE_CODE} from './utilitary.js';
import {fullPhotoContainer} from './preview.js';

const COMMENT_COUNT = 5;
const moreCommentsButton = document.querySelector('.social__comments-loader');
const commentsCountElement = document.querySelector('.social__comment-count');

/*
Функция отрисовывает массив объектов "Комментарии к фотографии".

Этапы работы:
1. Обнуляем содержимое контейнера для отрисовки комментариев. **иначе он добавляет комментарии к ранее отрисованным
2. Создаем копию массива комментариев к фотографии.
3. Отрезаем часть массива комментариев, не больше указанного размера.
4. Считаем количество выведенных комментариев.
5. Добавляем часть массива комментариев во фрагмент для вставки комментариев на страницу.
6. Обновляем надпись о количестве выведенных комментариев.
7. Добавляем обработчик событий для клика по фразе "Добавить комментарии":
- отрезаем часть массива комментариев от оставшегося, не больше указанного размера;
- обновляем количество выведенных комментариев;
- добавляем часть массива комментариев во фрагмент для вставки комментариев на страницу;
- обновляем надпись о количестве выведенных комментариев.
*/
function renderCommentList (list, container) {
  container.innerHTML = '';

  const commentsList = list.slice();
  const commentsPack = commentsList.splice(0, COMMENT_COUNT);
  let commentsCount = commentsPack.length;

  container.appendChild(addToFragment(commentsPack));

  commentsCountElement.innerHTML = `${commentsCount} из <span class="comments-count">${list.length}</span> комментариев`;

  moreCommentsButton.addEventListener('click', () => {
    const addCommentsPack = commentsList.splice(0, COMMENT_COUNT);
    const addCommentsCount = addCommentsPack.length;
    container.appendChild(addToFragment(addCommentsPack));
    commentsCount += addCommentsCount;
    commentsCountElement.innerHTML = `${commentsCount} из <span class="comments-count">${list.length}</span> комментариев`;
  });
}

/*
Функция добавления части массива комментариев во фрагмент.

Этапы работы:
1. Создаем фрагмент для вставки комментариев на страницу.
2. Для каждого комментария:
-  создаем элемент-комментарий и наполняем его согласно шаблону разметки комментария;
<li class="social__comment">
    <img
        class="social__picture"
        src="{{аватар}}"
        alt="{{имя комментатора}}"
        width="35" height="35">
    <p class="social__text">{{текст комментария}}</p>
</li>
- добавляем элемент-комментарий во фрагмент для вставки комментариев на страницу.
3. Возвращаем фрагмент для вставки комментариев на страницу.
*/

function addToFragment (list) {
  const addCommentFragment = document.createDocumentFragment();

  list.forEach(({avatar, name, message}) => {
    const newCommentElement = document.createElement('li');
    newCommentElement.classList.add('social__comment');

    const commentElementImage = document.createElement('img');
    commentElementImage.classList.add('social__picture');
    commentElementImage.src = avatar;
    commentElementImage.textContent = name;
    commentElementImage.width = 35;
    commentElementImage.height = 35;
    newCommentElement.appendChild(commentElementImage);

    const commentElementText = document.createElement('p');
    commentElementText.classList.add('social__text');
    commentElementText.textContent = message;
    newCommentElement.appendChild(commentElementText);

    addCommentFragment.appendChild(newCommentElement);
  });

  return addCommentFragment;
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
4. Добавляем тегу <body> класс modal-open, чтобы контейнер с фотографиями позади не прокручивался при скролле.
5. Добавляем обработчик событий для закрытия окна (условие срабатывания - клик по иконке закрытия окна).
6. Добавляем обработчик событий для закрытия окна (условие срабатывания - нажатие клавиши Esc).
*/

function renderFullView ({url, likes, comments, description}, container) {
  container.classList.remove('hidden');
  container.querySelector('.big-picture__img img').src = url;
  container.querySelector('.likes-count').textContent = likes;
  container.querySelector('.comments-count').textContent = comments.length;
  container.querySelector('.social__caption').textContent = description;

  const commentContainer = fullPhotoContainer.querySelector('.social__comments');
  renderCommentList(comments, commentContainer);

  document.querySelector('body').classList.add('modal-open');

  const closeFullViewButton = container.querySelector('#picture-cancel');

  closeFullViewButton.addEventListener('click', () => {
    closeFullView(container);
  });
  document.addEventListener('keydown', closeByKeydown);
}

/*
Функция закрытия окна с полноразмерным изображением одного из объектов "Описание фотографии" при клике по иконке закрытия окна.

Этапы работы:
1. Удаляем у тега <body> класса modal-open.
2. Добавляем класс hidden элементу .big-picture.
3. Удаляем обработчик событий для закрытия окна (условие срабатывания - нажатие клавиши Esc).
*/
function closeFullView (container) {
  document.querySelector('body').classList.remove('modal-open');
  container.classList.add('hidden');
  document.removeEventListener('keydown', closeByKeydown);
}

/*
Функция закрытия окна с полноразмерным изображением одного из объектов "Описание фотографии" при нажатии клавиши Esc.
*/
function closeByKeydown (evt) {
  if (evt.keyCode === ESCAPE_CODE) {
    closeFullView(fullPhotoContainer);
  }
}

export {renderFullView};
