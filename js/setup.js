'use strict';

var QUANTITY = 4;
var NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var SURNAMES = [' да Марья', ' Верон', ' Мирабелла', ' Вальц', ' Онопко', ' Топольницкая', ' Нионго', ' Ирвинг'];
var COAT_COLOR = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLOR = ['black', 'red', 'blue', 'yellow', 'green'];
var FIREBALL_COLOR = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

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


// Логика открытия и закрытия попапа с помощью клика и клавиатуры
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

var setupOpen = document.querySelector('.setup-open');
var setup = document.querySelector('.setup');
var setupClose = document.querySelector('.setup-close');

var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closePopup();
  }
};

var openPopup = function () {
  setup.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};

var closePopup = function () {
  setup.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};

setupOpen.addEventListener('click', function () {
  openPopup();
});

setupClose.addEventListener('click', function () {
  closePopup();
});

setupOpen.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openPopup();
  }
});

setupClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup();
  }
});


// При клике меняем цвет мантии персонажа
var wizardCoatSetup = document.querySelector('.setup-wizard').querySelector('.wizard-coat');

wizardCoatSetup.addEventListener('click', function () {
  wizardCoatSetup.style.fill = random(COAT_COLOR);
  document.querySelector('input[name=coat-color]').value = wizardCoatSetup.style.fill;
});

// При клике меняем цвет глаз персонажа
var wizardEyesSetup = document.querySelector('.setup-wizard').querySelector('.wizard-eyes');

wizardEyesSetup.addEventListener('click', function () {
  wizardEyesSetup.style.fill = random(EYES_COLOR);
  document.querySelector('input[name=eyes-color]').value = wizardEyesSetup.style.fill;
});

// При клике меняем цвет фаербола
var fireballWrapSetup = document.querySelector('.setup-fireball-wrap');

fireballWrapSetup.addEventListener('click', function () {
  var fireballValue = fireballWrapSetup.style.background = random(FIREBALL_COLOR);
  document.querySelector('input[name=fireball-color]').value = fireballValue;
});
