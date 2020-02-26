'use strict';

(function () {
  var WIZARD_COAT_COLORS = ['rgb(101, 137, 164)','rgb(241, 43, 107)','rgb(146, 100, 161)','rgb(56, 159, 117)','rgb(215, 210, 55)','rgb(0, 0, 0)'];
  var WIZARD_EYES_COLORS = ['black','red','blue','yellow','green'];
  var setup = document.querySelector('.setup');
  var eyesWizard = setup.querySelector('.wizard-eyes');
  var coatWizard = setup.querySelector('.wizard-coat');
  var eyesInputValue = setup.querySelector('input[name="eyes-color"]');
  var coatInputValue = setup.querySelector('input[name="coat-color"]');

  var onEyesChange = () => {};
  var onCoatChange = () => {};

  coatWizard.addEventListener('click', () => {
    var newColor = window.util.getRandomElementArr(WIZARD_COAT_COLORS);
    coatWizard.style.fill = newColor;
    coatInputValue.value = newColor;
    wizard.onCoatChange(newColor);
  });

  eyesWizard.addEventListener('click', () => {
    var newColor = window.util.getRandomElementArr(WIZARD_EYES_COLORS);
    eyesWizard.style.fill = newColor;
    eyesInputValue.value = newColor;
    wizard.onEyesChange(newColor);
  });

  window.wizard = {
    onEyesChange,
    onCoatChange
  };
})();
