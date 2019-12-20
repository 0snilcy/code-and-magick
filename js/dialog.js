'use strict';

(function () {
  var QUANTITY = 4;
  var NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var SURNAMES = [' да Марья', ' Верон', ' Мирабелла', ' Вальц', ' Онопко', ' Топольницкая', ' Нионго', ' Ирвинг'];
  var setup = document.querySelector('.setup');


  // Показывает диалоговое окно выбора мага
  setup.classList.remove('hidden');

  // Находим окно со списком магов
  var similarListElement = document.querySelector('.setup-similar-list');

  // Показываем блок со списком похожих персонажей и находим шаблон мага в Темлэйте
  document.querySelector('.setup-similar').classList.remove('hidden');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

  // Клонируем волшебников из Темлэйт
  var renderWizard = function () {
    var wizardElement = similarWizardTemplate.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = window.util.isRandomFormation(NAMES) + window.util.isRandomFormation(SURNAMES);
    wizardElement.querySelector('.wizard-coat').style.fill = window.util.isRandomFormation(window.color.COAT_COLOR);
    wizardElement.querySelector('.wizard-eyes').style.fill = window.util.isRandomFormation(window.color.EYES_COLOR);

    return wizardElement;
  };

  var fragment = document.createDocumentFragment();
  for (var i = 0; i < QUANTITY; i++) {
    fragment.appendChild(renderWizard());
  }
  similarListElement.appendChild(fragment);

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

