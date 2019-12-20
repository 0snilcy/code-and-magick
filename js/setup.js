'use strict';

(function () {
  var FIREBALL_COLOR = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

  // Логика открытия и закрытия попапа с помощью клика и клавиатуры
  var setupOpen = document.querySelector('.setup-open');
  var setup = document.querySelector('.setup');
  var setupClose = document.querySelector('.setup-close');

  var onPopupEscPress = function (evt) {
    window.util.isEscEvent(evt, closePopup);
  };

  setupOpen.addEventListener('click', function () {
    openPopup();
    setup.style.top = window.setupInitial.top + 'px';
    setup.style.left = window.setupInitial.left + 'px';
  });

  setupClose.addEventListener('click', function () {
    closePopup();
  });

  setupOpen.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, openPopup);
    setup.style.top = window.setupInitial.top + 'px';
    setup.style.left = window.setupInitial.left + 'px';
  });

  setupClose.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, closePopup);
  });

  var openPopup = function () {
    setup.classList.remove('hidden');
    document.addEventListener('keydown', onPopupEscPress);
  };

  var closePopup = function () {
    setup.classList.add('hidden');
    document.removeEventListener('keydown', onPopupEscPress);
  };

  // При клике меняем цвет мантии персонажа
  var wizardCoatSetup = document.querySelector('.setup-wizard').querySelector('.wizard-coat');

  wizardCoatSetup.addEventListener('click', function () {
    wizardCoatSetup.style.fill = window.util.isRandomFormation(window.color.COAT_COLOR);
    document.querySelector('input[name=coat-color]').value = wizardCoatSetup.style.fill;
  });

  // При клике меняем цвет глаз персонажа
  var wizardEyesSetup = document.querySelector('.setup-wizard').querySelector('.wizard-eyes');

  wizardEyesSetup.addEventListener('click', function () {
    wizardEyesSetup.style.fill = window.util.isRandomFormation(window.color.EYES_COLOR);
    document.querySelector('input[name=eyes-color]').value = wizardEyesSetup.style.fill;
  });

  // При клике меняем цвет фаербола
  var fireballWrapSetup = document.querySelector('.setup-fireball-wrap');

  fireballWrapSetup.addEventListener('click', function () {
    var fireballValue = fireballWrapSetup.style.background = window.util.isRandomFormation(FIREBALL_COLOR);
    document.querySelector('input[name=fireball-color]').value = fireballValue;
  });
})();


