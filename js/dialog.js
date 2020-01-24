'use strict';

(function () {
  var setup = document.querySelector('.setup');
  var wizards = [];

  // Показывает диалоговое окно выбора мага
  setup.classList.remove('hidden');

  // функция, которая реагирует на все изменения
  var updateWizards = function () {
    window.loadHundler(wizards);
  };

  // Сохраняем данные, которые загружены с сервера, в массив
  var successHundler = function (data) {
    wizards = data;
    updateWizards();
  };

  // При клике меняем цвет мантии персонажа
  var coatColor;
  var wizardCoatSetup = document.querySelector('.setup-wizard').querySelector('.wizard-coat');

  wizardCoatSetup.addEventListener('click', function () {
    var newColor = window.util.isRandomFormation(window.color.COAT_COLOR);
    this.style.fill = newColor;
    coatColor = newColor;
    document.querySelector('input[name=coat-color]').value = wizardCoatSetup.style.fill;
  });


  // При клике меняем цвет глаз персонажа
  var eyesColor;
  var wizardEyesSetup = document.querySelector('.setup-wizard').querySelector('.wizard-eyes');


  wizardEyesSetup.addEventListener('click', function () {
    var newColor = window.util.isRandomFormation(window.color.EYES_COLOR);
    wizardEyesSetup.style.fill = newColor;
    eyesColor = newColor;
    document.querySelector('input[name=eyes-color]').value = wizardEyesSetup.style.fill;
  });

  // Окно ошибки при загрузке данных с сервера
  window.errorHundler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.load(successHundler, window.errorHundler);

  var form = setup.querySelector('.setup-wizard-form');
  form.addEventListener('submit', function (evt) {
    window.save(new FormData(form), function () {
      setup.classList.add('hidden');
    });
    evt.preventDefault();
  });

  // Перемещение диалгового окна
  var dialogHandler = setup.querySelector('.upload');
  window.setupInitial = {
    top: setup.offsetTop,
    left: setup.offsetLeft
  };

  dialogHandler.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var dragged = false;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      dragged = true;

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      setup.style.top = (setup.offsetTop - shift.y) + 'px';
      setup.style.left = (setup.offsetLeft - shift.x) + 'px';
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (dragged) {
        var onClickPreventDefault = function (evt) {
          evt.preventDefault();
          dialogHandler.removeEventListener('click', onClickPreventDefault);
        };
        dialogHandler.addEventListener('click', onClickPreventDefault);
      }
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();

