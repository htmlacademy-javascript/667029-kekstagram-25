const imageUploadForm = document.querySelector('.img-upload__form');
const uploadFileControl = document.querySelector('.img-upload__input');
const cancelUploadButton = document.querySelector('.img-upload__cancel');
const scaleControlInput = document.querySelector('.scale__control--value');
const effectLevelInput = document.querySelector('.effect-level__value');
const effectNoneInput = document.querySelector('#effect-none');
const hashtagsInput = document.querySelector('.text__hashtags');
const commentInput = document.querySelector('.text__description');

uploadFileControl.addEventListener('change', renderImageUploadForm);

function renderImageUploadForm () {
  document.querySelector('.img-upload__overlay').classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');

  cancelUploadButton.addEventListener('click', closeImageUploadForm);
  document.addEventListener('keydown', closeByKeydown);
  imageUploadForm.addEventListener('submit', validateimageUploadForm);
}

function closeImageUploadForm () {
  document.querySelector('.img-upload__overlay').classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');

  cancelUploadButton.removeEventListener('click', closeImageUploadForm);
  document.removeEventListener('keydown', closeByKeydown);
  imageUploadForm.removeEventListener('submit', validateimageUploadForm);

  uploadFileControl.value = '';
  scaleControlInput.value = '100%';
  effectLevelInput.value = '';
  effectNoneInput.checked = true;
  hashtagsInput.value = '';
  commentInput.value = '';
}

function closeByKeydown (evt) {
  if (evt.keyCode === 27) {
    closeImageUploadForm();
  }
}

const pristine = new Pristine(imageUploadForm, {
  classTo: 'text__description',
  errorTextParent: 'text__description',
  errorTextTag: 'span',
  errorTextClass: 'img-upload__error-text',
});

function validateimageUploadForm (evt) {
  evt.preventDefault();
  pristine.validate();
}
