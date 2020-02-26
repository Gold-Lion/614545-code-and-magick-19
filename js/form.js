'use strict';

(function () {
  var TIME_DELETE_MESSAGE = 5000;
  var setup = document.querySelector('.setup');
  var userName = setup.querySelector('.setup-user-name');
  var form = document.querySelector('.setup-wizard-form');
  var submitBtn = form.querySelector('.setup-submit');
  var successTemplate = document.querySelector('#success').content.querySelector('.success-block');
  var errorTemplate = document.querySelector('#error').content.querySelector('.error-block');

  var initialBtnForm = () => {
    submitBtn.disabled = false;
    submitBtn.textContent = 'Сохранить';
  }

  var preloaderBtnForm = () => {
    submitBtn.disabled = true;
    submitBtn.textContent = 'Данные отправляются...';
  };

  var hiddenForm = () => {
    setup.classList.add('hidden');
    initialBtnForm();
  };

  var removeMessage = (element) => {
    setTimeout(() => element.remove(), TIME_DELETE_MESSAGE);
  }

  var showSuccessMessage = (data) => {
    document.body.appendChild(successTemplate);
    hiddenForm();
    removeMessage(successTemplate);
  };

  var showErrorMessage = (errorMessage) => {
    var newErrorTemplate = errorTemplate.cloneNode(true);
    var errorText = newErrorTemplate.querySelector('.error-text');
    errorText.textContent = errorMessage;

    document.body.appendChild(newErrorTemplate)
    hiddenForm();
    removeMessage(newErrorTemplate);
  };

  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    userName.value = userName.value.trim();

    window.backend.save(new FormData(form), showSuccessMessage, showErrorMessage);

    preloaderBtnForm();
  });

  window.form = {
    showErrorMessage
  }
})();
