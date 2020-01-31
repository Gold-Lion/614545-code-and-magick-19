'use strict';

const WIZARD_NAMES = ['Иван','Хуан Себастьян','Мария','Кристоф','Виктор','Юлия','Люпита','Вашингтон'];
const WIZARD_SURNAMES = ['да Марья','Верон','Мирабелла','Вальц','Онопко','Топольницкая','Нионго','Ирвинг'];
const WIZARD_COAT_COLOR = ['rgb(101, 137, 164)','rgb(241, 43, 107)','rgb(146, 100, 161)','rgb(56, 159, 117)','rgb(215, 210, 55)','rgb(0, 0, 0)',];
const WIZARD_EYES_COLOR = ['black','red','blue','yellow','green',];
const COUT_SIMILAR_WIZARDS = 4;
const setup = document.querySelector('.setup');
const similarList = setup.querySelector('.setup-similar-list');
const similarTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

const openSetup = () => {
  setup.classList.remove('hidden');
};

const activeSetupSimilar = () => {
  setup.querySelector('.setup-similar').classList.remove('hidden');
};

const getRandomElementArr = (arr) => {
  return arr[getRandomNumber(0, arr.length - 1)];
};

const createSimilarWizard = () => {
  let similarWizard = {
    names: getRandomElementArr(WIZARD_NAMES),
    surnames: getRandomElementArr(WIZARD_SURNAMES),
    coatColor: getRandomElementArr(WIZARD_COAT_COLOR),
    eyesColor: getRandomElementArr(WIZARD_EYES_COLOR)
  };

  return similarWizard;
};

const getArraySimilarWizards = (total) => {
  let similarWizardsArr = [];

  for (let i = 0; i < total.length; i++) {
    similarWizardsArr.push(createSimilarWizard());
  }

  return similarWizardsArr;
};

const renderSimilarWizards = (wizards) => {
  let similarFragment = document.createDocumentFragment();

  for (let i = 0; i < COUT_SIMILAR_WIZARDS; i++) {
    let wizard = wizards[i];

    let newSimilarItem = similarTemplate.cloneNode(true);
    newSimilarItem.querySelector('.setup-similar-label').textContent = `${wizard.names} ${wizard.surnames}`;
    newSimilarItem.querySelector('.wizard-coat').style.fill = wizard.coatColor;
    newSimilarItem.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

    similarFragment.appendChild(newSimilarItem);
  }

  similarList.appendChild(similarFragment);
};

renderSimilarWizards(getArraySimilarWizards(WIZARD_NAMES));
openSetup();
activeSetupSimilar();
