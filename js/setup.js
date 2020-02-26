'use strict';

(function () {
  var WIZARD_FIERBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
  var setup = document.querySelector('.setup');
  var openSetup = document.querySelector('.setup-open');
  var closeSetup = setup.querySelector('.setup-close');
  var userName = setup.querySelector('.setup-user-name');
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

  var onOpenPopupClick = () => {
    openPopup();
  }

  var onClosePopupClick = () => {
    closePopup();
  }

  var onOpenPopupEnterPress = (evt) => {
    window.util.isEnterEvent(evt, openPopup);
  }

  var onClosePopupEnterPress = (evt) => {
    window.util.isEnterEvent(evt, closePopup);
  }

  openSetup.addEventListener('click', onOpenPopupClick);
  closeSetup.addEventListener('click', onClosePopupClick);
  openSetup.addEventListener('keydown', onOpenPopupEnterPress);
  closeSetup.addEventListener('keydown', onClosePopupEnterPress);

  window.colorize(fireballWizard, WIZARD_FIERBALL_COLORS, fireballInputValue);
})();
