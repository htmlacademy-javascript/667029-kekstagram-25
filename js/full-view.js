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
  const commentFragment = document.createDocumentFragment();

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

    commentFragment.appendChild(newCommentElement);
  });
  container.appendChild(commentFragment);
}

/*
Функция отрисовывает окно с полноразмерным изображением одного из объектов "Описание фотографии".
Возможности для пользователя:
- просмотреть фотографию в полноразмерном режиме;
- поставить «лайк»; **в данный момент не реализвано
- почитать комментарии, оставленные другими пользователями.

Этапы работы:
1. Получаем попап (элемент .big-picture).
2. Удаляем класс hidden у элемента .big-picture
3. Заполняем элемент .big-picture данными о конкретной фотографии:
- адрес изображения url подставляем как src изображения внутри блока .big-picture__img;
- количество лайков likes подставляем как текстовое содержание элемента .likes-count;
- количество комментариев comments подставляем как текстовое содержание элемента .comments-count;
- описание фотографии description вставляем строкой в блок .social__caption.
4. Получаем контейнер для отрисовки списка комментариев (блок .social__comments). Отрисовываем комментарии к фотографии.
5. Прячем блоки счётчика комментариев .social__comment-count и загрузки новых комментариев .comments-loader (добавляем им класс hidden).
6. Добавляем тегу <body> класс modal-open, чтобы контейнер с фотографиями позади не прокручивался при скролле. При закрытии окна не забудьте удалить этот класс.
7. Добавляем обработчик событий для закрытия окна (условие срабатывания - клик по иконке закрытия окна).
8. Добавляем обработчик событий для закрытия окна (условие срабатывания - нажатие клавиши Esc).
*/
const fullPhotoContainer = document.querySelector('.big-picture');

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

  document.addEventListener('keydown', closeByKeydown);
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
  document.removeEventListener('keydown', closeByKeydown);
}

/*
Функция-обработчик события.
Ожидает нажатие клавиши Esc. Вызывает функцию закрытия окна с полноразмерным изображением одного из объектов "Описание фотографии".
*/
function closeByKeydown (evt) {
  if (evt.keyCode === 27) {
    closeFullView(fullPhotoContainer);
  }
}

export {renderFullView};
