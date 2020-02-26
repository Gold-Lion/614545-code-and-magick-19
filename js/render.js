'use strict';

(function () {
  var setup = document.querySelector('.setup');
  var similarList = setup.querySelector('.setup-similar-list');
  var similarTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

  var renderSimilarWizard = (wizard) => {
    var newSimilarItem = similarTemplate.cloneNode(true);
    newSimilarItem.querySelector('.setup-similar-label').textContent = wizard.name;
    newSimilarItem.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    newSimilarItem.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;

    return newSimilarItem;
  }

  window.render = (data) => {
    var takeNumber = data.length > 4 ? 4 : data.length;
    similarList.innerHTML = '';

    for (var i = 0; i < takeNumber; i++) {
      similarList.appendChild(renderSimilarWizard(data[i]));
    }
  };
})();
