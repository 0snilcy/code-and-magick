'use strict';

(function () {
  var color = {
    COAT_COLOR: ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'],
    EYES_COLOR: ['black', 'red', 'blue', 'yellow', 'green']
  };

  var wizard = {
    onCoatChange: function (color) {},
    onEyesChange: function (color) {}
  };

  // При клике меняем цвет мантии персонажа
  var wizardCoatSetup = document.querySelector('.setup-wizard').querySelector('.wizard-coat');
  wizardCoatSetup.addEventListener('click', function () {
    var newColor = window.util.isRandomFormation(color.COAT_COLOR);
    this.style.fill = newColor;
    window.wizard.onCoatChange(newColor);
    document.querySelector('input[name=coat-color]').value = wizardCoatSetup.style.fill;
  });

  // При клике меняем цвет глаз персонажа
  var wizardEyesSetup = document.querySelector('.setup-wizard').querySelector('.wizard-eyes');
  wizardEyesSetup.addEventListener('click', function () {
    var newColor = window.util.isRandomFormation(color.EYES_COLOR);
    wizardEyesSetup.style.fill = newColor;
    window.wizard.onEyesChange(newColor);
    document.querySelector('input[name=eyes-color]').value = wizardEyesSetup.style.fill;
  });

  return window.wizard = wizard;
})();
