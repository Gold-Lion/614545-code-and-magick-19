'use strict';

(function () {
  var setup = document.querySelector('.setup');
  var dialogHandler = setup.querySelector('.upload');

  dialogHandler.addEventListener('mousedown', (evt) => {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var windowWidth = document.body.clientWidth;

    var dragged = false;

    var onMouseMove = (evtMove) => {
      evtMove.preventDefault();

      dragged = true;

      var shift = {
        x: startCoords.x - evtMove.clientX,
        y: startCoords.y - evtMove.clientY
      };

      startCoords = {
        x: evtMove.clientX,
        y: evtMove.clientY
      };

      var newCoords = {
        x: setup.offsetLeft - shift.x,
        y: setup.offsetTop - shift.y
      };

      if (setup.offsetLeft < setup.offsetWidth / 2) {
        setup.style.left = setup.offsetWidth / 2 + 'px';
      } else {
        setup.style.left = `${newCoords.x}px`;
      }

      if (setup.getBoundingClientRect().x + setup.offsetWidth > windowWidth) {
        setup.style.left = width - setup.offsetWidth / 2 + 'px';
      }

      if (setup.offsetTop < 0) {
        setup.style.top = 0 + 'px';

      } else {
        setup.style.top = `${newCoords.y}px`;
      }

    };


    var onMouseUp = (evtUp) => {
      evtUp.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (dragged) {
        var onClickPreventDefault = function (clickEvt) {
          clickEvt.preventDefault();
          dialogHandler.removeEventListener('click', onClickPreventDefault)
        };
        dialogHandler.addEventListener('click', onClickPreventDefault);
      }
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  })
})();
