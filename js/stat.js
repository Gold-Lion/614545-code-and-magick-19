'use stict';

var WIDTH_CLOUD = 420;
var HEIGHT_CLOUD = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var FONT_GAP = 20;
var WIDTH_BAR = 40;
var HEIGHT_BAR = 150;
var BAR_GAP = 50;
var TEXT_X = CLOUD_X + BAR_GAP;
var TEXT_Y = 265;
var TEXT_GAP = 15;

var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var getMaxElement = function (arr) {
  return Math.max.apply(null, arr);
};

var wrapText = function (ctx, text, marginLeft, marginTop, maxWidth, lineHeight) {
  var words = text.split(" ");
  var countWords = words.length;
  var line = "";
  for (var n = 0; n < countWords; n++) {
    var testLine = line + words[n] + " ";
    var testWidth = ctx.measureText(testLine).width;
    if (testWidth > maxWidth) {
      ctx.fillText(line, marginLeft, marginTop);
      line = words[n] + " ";
      marginTop += lineHeight;
    }
    else {
      line = testLine;
    }
  }
  ctx.fillText(line, marginLeft, marginTop);
};

var createMessage = function (ctx, x, y) {
  var text = "Ура вы победили! " + "Список результатов: ";
  var lineHeight = 25;
  var marginLeft = x;
  var marginTop = y;
  var maxWidth = 230;

  ctx.font = "16px PT Mono";
  ctx.fillStyle = '#000';

  wrapText(ctx, text, marginLeft, marginTop, maxWidth, lineHeight);
};


var renderCloud = function (ctx, x, y, width, height, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, width, height);
};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, WIDTH_CLOUD, HEIGHT_CLOUD, 'rgba(0, 0, 0, 0.3)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, WIDTH_CLOUD, HEIGHT_CLOUD, 'rgba(255, 255, 255, 1)');

  var maxTime = getMaxElement(times);

  names.forEach(function (player, i) {
    if (player == 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    } else {
      ctx.fillStyle = 'hsl(240,' + getRandomNumber(0, 100) + '%,' + getRandomNumber(10, 90) + '%)';
    }
    ctx.fillRect(CLOUD_X + BAR_GAP + (WIDTH_BAR + BAR_GAP) * i, TEXT_Y - FONT_GAP, WIDTH_BAR, -(HEIGHT_BAR * times[i]) / maxTime);
    ctx.fillStyle = '#000';
    ctx.fillText(player, TEXT_X + (WIDTH_BAR + BAR_GAP) * i, TEXT_Y);
    ctx.fillText(Math.round(times[i]), TEXT_X + (WIDTH_BAR + BAR_GAP) * i, TEXT_Y - FONT_GAP - GAP - (HEIGHT_BAR * times[i]) / maxTime);
  });

  createMessage(ctx, CLOUD_X + FONT_GAP, CLOUD_Y + GAP + FONT_GAP);
};
