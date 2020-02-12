'use strict';

(function () {
  var setup = document.querySelector('.setup');
  var userName = setup.querySelector('.setup-user-name');
  var form = document.querySelector('.setup-wizard-form');
  var submitBtn = form.querySelector('.setup-submit');

  form.addEventListener('submit', (evt) => {
    evt.preventDefault();

    userName.value = userName.value.trim();
    submitBtn.disabled = true;
  });
})();
