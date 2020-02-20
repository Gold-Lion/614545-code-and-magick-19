'use strict';

(function () {
  var setup = document.querySelector('.setup');
  var userName = setup.querySelector('.setup-user-name');
  var form = document.querySelector('.setup-wizard-form');
  var submitBtn = form.querySelector('.setup-submit');

  form.addEventListener('submit', (evt) => {
    window.backend.save(new FormData(form), (response) => {
      setup.classList.add('hidden');
      submitBtn.disabled = false;
      submitBtn.textContent = 'Сохранить';
    });
    evt.preventDefault();

    userName.value = userName.value.trim();
    submitBtn.disabled = true;
    submitBtn.textContent = 'Подождите...';

  });
})();
