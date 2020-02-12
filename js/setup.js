'use strict';

var WIZARD_NAMES = ['Иван','Хуан Себастьян','Мария','Кристоф','Виктор','Юлия','Люпита','Вашингтон'];
var WIZARD_SURNAMES = ['да Марья','Верон','Мирабелла','Вальц','Онопко','Топольницкая','Нионго','Ирвинг'];
var WIZARD_COAT_COLORS = ['rgb(101, 137, 164)','rgb(241, 43, 107)','rgb(146, 100, 161)','rgb(56, 159, 117)','rgb(215, 210, 55)','rgb(0, 0, 0)',];
var WIZARD_EYES_COLORS = ['black','red','blue','yellow','green',];
var WIZARD_FIERBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
var setup = document.querySelector('.setup');
var similarList = setup.querySelector('.setup-similar-list');
var similarTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
var openSetup = document.querySelector('.setup-open');
var closeSetup = setup.querySelector('.setup-close');
var userName = setup.querySelector('.setup-user-name');
var eyesWizard = setup.querySelector('.wizard-eyes');
var eyesInputValue = setup.querySelector('input[name="eyes-color"]');
var coatWizard = setup.querySelector('.wizard-coat');
var coatInputValue = setup.querySelector('input[name="coat-color"]');
var fireballWizard = setup.querySelector('.setup-fireball-wrap');
var fireballInputValue = setup.querySelector('input[name="fireball-color"]');

var onPopupEscPress = (evt) => {
  window.util.isEscEvent(evt, closePopup);
};

var activeSetupSimilar = () => {
  setup.querySelector('.setup-similar').classList.remove('hidden');
};

var openPopup = () => {
  setup.classList.remove('hidden');
  activeSetupSimilar();
  document.addEventListener('keydown', onPopupEscPress);
};

var closePopup = () => {
  if (userName !== document.activeElement) {
    setup.classList.add('hidden');
    setup.style = '';
    document.removeEventListener('keydown', onPopupEscPress);
  }
};

openSetup.addEventListener('click', () => {
  openPopup();
});

closeSetup.addEventListener('click', () => {
  closePopup();
});

openSetup.addEventListener('keydown', (evt) => {
  window.util.isEnterEvent(evt, openPopup);
});

closeSetup.addEventListener('keydown', (evt) => {
  window.util.isEnterEvent(evt, closePopup);
});

window.colorize(eyesWizard, WIZARD_EYES_COLORS, eyesInputValue);
window.colorize(coatWizard, WIZARD_COAT_COLORS, coatInputValue);
window.colorize(fireballWizard, WIZARD_FIERBALL_COLORS, fireballInputValue);

var createSimilarWizard = () => {
  var similarWizard = {
    names: window.util.getRandomElementArr(WIZARD_NAMES),
    surnames: window.util.getRandomElementArr(WIZARD_SURNAMES),
    coatColor: window.util.getRandomElementArr(WIZARD_COAT_COLORS),
    eyesColor: window.util.getRandomElementArr(WIZARD_EYES_COLORS)
  };

  return similarWizard;
};

var getArraySimilarWizards = (total) => {
  var similarWizardsArr = [];

  for (var i = 0; i < total.length; i++) {
    similarWizardsArr.push(createSimilarWizard());
  }

  return similarWizardsArr;
};

var renderSimilarWizards = (wizards) => {
  var similarFragment = document.createDocumentFragment();

  for (var i = 0; i < window.util.COUT_SIMILAR_WIZARDS; i++) {
    var wizard = wizards[i];

    var newSimilarItem = similarTemplate.cloneNode(true);
    newSimilarItem.querySelector('.setup-similar-label').textContent = `${wizard.names} ${wizard.surnames}`;
    newSimilarItem.querySelector('.wizard-coat').style.fill = wizard.coatColor;
    newSimilarItem.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

    similarFragment.appendChild(newSimilarItem);
  }

  similarList.appendChild(similarFragment);
};

renderSimilarWizards(getArraySimilarWizards(WIZARD_NAMES));
