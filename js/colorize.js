'use strict';

(function () {
  window.colorize = (element, arrColor, input) => {
    element.addEventListener('click', () => {
      var color = window.util.getRandomElementArr(arrColor);

      if (input) {
        input.value = color;
      }

      if (element.tagName.toLowerCase() === 'div') {
        element.style.backgroundColor = color;
      } else {
        element.style.fill = color;
      }
    });
  };
})();
