'use strict';

(function () {
  var QUANTITY = 4;

  // Находим окно со списком магов
  var similarListElement = document.querySelector('.setup-similar-list');

  // Показываем блок со списком похожих персонажей и находим шаблон мага в Темлэйте
  document.querySelector('.setup-similar').classList.remove('hidden');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

  // Клонируем волшебников из Темлэйт
  var renderWizard = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;

    return wizardElement;
  };

  // Создание мага на основе данных с сервера
  window.loadHundler = function (wizard) {
    var setup = document.querySelector('.setup');
    var fragment = document.createDocumentFragment();
    similarListElement.innerHTML = '';
    var takeNumber = wizard.length > 4 ? 4 : wizard.length;
    for (var i = 0; i < takeNumber; i++) {
      fragment.appendChild(renderWizard(wizard[i]));
    }
    similarListElement.appendChild(fragment);

    setup.querySelector('.setup-similar').classList.remove('hidden');
  };
})();
