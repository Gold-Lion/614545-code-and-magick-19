'use strict';

(function () {
  var setup = document.querySelector('.setup');
  var userName = setup.querySelector('.setup-user-name');

  userName.addEventListener('invalid', () => {
    if (userName.validity.tooShort) {
      userName.setCustomValidity(`Имя должно быть длинее ${userName.minLength} символов. Длина вашего имени составляет ${userName.value.length}`);
    } else if (userName.validity.tooLong) {
      userName.setCustomValidity(`Имя не должно превышать ${userName.maxLength} символов`);
    } else if (userName.validity.valueMissing) {
      userName.setCustomValidity(`Вы пропустили это поле! Пожалуйста заполните его исходя из следующих условий: Длина вашего имени от ${userName.minLength} до ${userName.maxLength} символов.`);
    } else {
      userName.setCustomValidity('');
    }
  });
})();
