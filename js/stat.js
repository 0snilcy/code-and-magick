var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var FONT_GAP = 15;
var FONT_TEXT = '16px PT Mono';
var BAR_WIGHT = 40;
var BAR_DISTANSE = 50;
var BAR_HEIGHT =-CLOUD_HEIGHT + (GAP * 6) + (FONT_GAP * 4);
var TIME_Y = CLOUD_HEIGHT - GAP - FONT_GAP;


var renderCloud = function(ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var renderText = function (ctx, x, y) {
  ctx.fillStyle = '#000';
  ctx.textBaseline = 'hanging';
  ctx.font = FONT_TEXT;
  ctx.fillText('Ура вы победили!', x, y);
  ctx.fillText('Список результатов:', x, y + GAP*2);
};

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

var getMaxElement = function(arr) {
  var maxElement = arr[0];

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

window.renderStatistics = function(ctx, names, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');
  renderText(ctx, CLOUD_X + GAP * 2, CLOUD_Y + FONT_GAP);

  var maxTime = getMaxElement(times);

  ctx.fillStyle = '#000';

  for (var i=0; i<names.length; i++) {

    if (names[i] === 'Вы') {
      ctx.fillStyle = '#ff0000';
    } else {
      ctx.fillStyle = 'hsla(240,' + (getRandomArbitrary(30, 100)) + '%, 50%, 1)';
    }

    var columnPositionX = CLOUD_X + BAR_DISTANSE - GAP + (BAR_WIGHT + BAR_DISTANSE)*i;
    var columnPositionY = (BAR_HEIGHT*times[i])/maxTime;

    ctx.fillRect(columnPositionX, CLOUD_HEIGHT - FONT_GAP - GAP, BAR_WIGHT, columnPositionY);
    ctx.fillStyle = '#000';
    ctx.fillText(names[i], columnPositionX, CLOUD_HEIGHT - FONT_GAP);
    ctx.fillText(Math.round(times[i]), columnPositionX, (CLOUD_HEIGHT - BAR_DISTANSE + columnPositionY));
  }
};
