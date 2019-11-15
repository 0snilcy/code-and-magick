'use strict';

var QUANTITY = 4;
var NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var SURNAMES = [' да Марья', ' Верон', ' Мирабелла', ' Вальц', ' Онопко', ' Топольницкая', ' Нионго', ' Ирвинг'];
var COAT_COLOR = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLOR = ['black', 'red', 'blue', 'yellow', 'green'];

// Показывает диалоговое окно выбора мага
var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');

// Находим окно со списком магов
var similarListElement = document.querySelector('.setup-similar-list');

// Показываем блок со списком похожих персонажей и находим шаблон мага в Темлэйте
document.querySelector('.setup-similar').classList.remove('hidden');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

// Клонируем волшебников из Темлэйт
var renderWizard = function () {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = random(NAMES) + random(SURNAMES);
  wizardElement.querySelector('.wizard-coat').style.fill = random(COAT_COLOR);
  wizardElement.querySelector('.wizard-eyes').style.fill = random(EYES_COLOR);

  return wizardElement;
};

var fragment = document.createDocumentFragment();
for (var i = 0; i < QUANTITY; i++) {
  fragment.appendChild(renderWizard());
}
similarListElement.appendChild(fragment);

// Функция генерации случайных данных
function random(array) {
  return array[Math.floor(Math.random() * array.length)];
}


