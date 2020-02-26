  'use strict';

  (function () {
    var ESC_KEYCODE = 27;
    var ENTER_KEYCODE = 13;
    var COUT_SIMILAR_WIZARDS = 4;

    var debounce = () => {

    };

    var isEscEvent = (evt, action) => {
      if (evt.keyCode === ESC_KEYCODE) {
        action();
      }
    };

    var isEnterEvent = (evt, action) => {
      if (evt.keyCode === ENTER_KEYCODE) {
        action();
      }
    };

    var getRandomElementArr = (arr) => {
      return arr[getRandomNumber(0, arr.length - 1)];
    };

    var getRandomNumber = (min, max) => {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    var getMaxElement = (arr) => {
      return Math.max.apply(null, arr);
    };

    var getMinElement = (arr) => {
      return Math.min.apply(null, arr);
    };

    window.util = {
      COUT_SIMILAR_WIZARDS,
      getRandomElementArr,
      getRandomNumber,
      getMaxElement,
      getMinElement,
      isEscEvent,
      isEnterEvent
    };
  })();
