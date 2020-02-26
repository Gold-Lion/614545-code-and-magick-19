'use strict';

(function () {
  var coatColor;
  var eyesColor;
  var wizards = [];

  var getRank = (wizard) => {
    var rank = 0;

    if (wizard.colorCoat === coatColor) {
      rank += 2;
    }
    if (wizard.colorEyes === eyesColor) {
      rank += 1;
    }

    return rank;
  };

  var namesComparator = (left, right) => {
    if (left > right) {
      return 1;
    } else if (left < right) {
      return -1;
    } else {
      return 0;
    }
  };

  var updateWizards = () => {
    var wizardsSort = wizards.sort((left, right) => {
      var diffRank = getRank(right) - getRank(left);
      if (diffRank === 0) {
        diffRank = namesComparator(left.name, right.name);
      }
      return diffRank;
    });

    window.render(wizardsSort);
  };

  window.wizard.onEyesChange = window.debounce((color) => {
    eyesColor = color;
    updateWizards();
  });

  window.wizard.onCoatChange = window.debounce((color) => {
    coatColor = color;
    updateWizards();
  });

  var onSuccess = (data) => {
    wizards = data;
    updateWizards();
  };

  window.backend.load(onSuccess, window.form.showErrorMessage);
})();
