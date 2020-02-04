'use strict';

const KeyCode = {
  ESC: 27,
  ENTER: 13
};
const WIZARD_NAMES = ['Иван','Хуан Себастьян','Мария','Кристоф','Виктор','Юлия','Люпита','Вашингтон'];
const WIZARD_SURNAMES = ['да Марья','Верон','Мирабелла','Вальц','Онопко','Топольницкая','Нионго','Ирвинг'];
const WIZARD_COAT_COLORS = ['rgb(101, 137, 164)','rgb(241, 43, 107)','rgb(146, 100, 161)','rgb(56, 159, 117)','rgb(215, 210, 55)','rgb(0, 0, 0)',];
const WIZARD_EYES_COLORS = ['black','red','blue','yellow','green',];
const WIZARD_FIERBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
const COUT_SIMILAR_WIZARDS = 4;
const setup = document.querySelector('.setup');
const similarList = setup.querySelector('.setup-similar-list');
const similarTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
const openSetup = document.querySelector('.setup-open');
const closeSetup = setup.querySelector('.setup-close');
const userName = setup.querySelector('.setup-user-name');
const form = document.querySelector('.setup-wizard-form');
const submitBtn = form.querySelector('.setup-submit');

form.addEventListener('submit', (evt) => {
  evt.preventDefault();

  userName.value = userName.value.trim();
  submitBtn.disabled = true;
});

// Работа с диалоговым окном (SETUP)
const popupEscPressHandler = (evt) => {
  if (evt.keyCode === KeyCode.ESC) {
    closePopup();
  }
};

const openPopup = () => {
  setup.classList.remove('hidden');
  document.addEventListener('keydown', popupEscPressHandler);
};

const closePopup = () => {
  if (userName !== document.activeElement) {
    setup.classList.add('hidden');
    document.removeEventListener('keydown', popupEscPressHandler);
  }
};

openSetup.addEventListener('click', () => {
  openPopup();
});

closeSetup.addEventListener('click', () => {
  closePopup();
});

openSetup.addEventListener('keydown', (evt) => {
  if (evt.keyCode === KeyCode.ENTER) {
    openPopup();
  }
});

closeSetup.addEventListener('keydown', (evt) => {
  if (evt.keyCode === KeyCode.ENTER) {
    closePopup();
  }
});

// Валидация формы. Валидация на длину имени. Вывод соответствующего сообщения
userName.addEventListener('invalid', (evt) => {
  if (userName.validity.tooShort) {
    userName.setCustomValidity(`Имя должно быть длинее ${userName.minLength} символов. Длина вашего имени составляет ${userName.value.length}`);
  } else if (userName.validity.tooLong) {
    userName.setCustomValidity(`Имя не должно превышать ${userName.maxLength} символов`);
  } else if (userName.validity.valueMissing) {
    userName.setCustomValidity(`Вы пропустили это поле! Пожалуйста заполните его исходя из следующих условий: Длина вашего имени от ${userName.minLength} до ${userName.maxLength} символов.`);
  }
});

// Отрисовка похожих персонажей
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
    coatColor: getRandomElementArr(WIZARD_COAT_COLORS),
    eyesColor: getRandomElementArr(WIZARD_EYES_COLORS)
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
activeSetupSimilar();


// Описываем изменение цвета глаз, мантии и файрбола при нажатие на них
const eyesWizard = setup.querySelector('.wizard-eyes');
const eyesInputValue = setup.querySelector('input[name="eyes-color"]');
const coatWizard = setup.querySelector('.wizard-coat');
const coatInputValue = setup.querySelector('input[name="coat-color"]');
const fireballWizard = setup.querySelector('.setup-fireball-wrap');
const fireballInputValue = setup.querySelector('input[name="fireball-color"]');

const eyesWizardColor= (color) => {
  eyesWizard.style.fill = color;
  eyesInputValue.value = color;;
};

const coatWizardColor= (color) => {
  coatWizard.style.fill = color;
  coatInputValue.value = color;;
};

const fireballWizardColor= (color) => {
  fireballWizard.style.backgroundColor = color;
  fireballInputValue.value = color;;
};

eyesWizard.addEventListener('click', () => {
  eyesWizardColor(getRandomElementArr(WIZARD_EYES_COLORS));
});

coatWizard.addEventListener('click', () => {
  coatWizardColor(getRandomElementArr(WIZARD_COAT_COLORS));
});

fireballWizard.addEventListener('click', () => {
  fireballWizardColor(getRandomElementArr(WIZARD_FIERBALL_COLORS));
});
