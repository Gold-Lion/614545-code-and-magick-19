'use strict';

(function () {
  var WIDTH_CLOUD = 420;
  var HEIGHT_CLOUD = 270;
  var CLOUD_X = 100;
  var CLOUD_Y = 10;
  var MINI_GAP = 7;
  var FONT_GAP = 20;
  var WIDTH_BAR = 40;
  var HEIGHT_BAR = 150;
  var BAR_GAP = 50;
  var TEXT_X = CLOUD_X + BAR_GAP;
  var TEXT_Y = 265;

  var createMessage = (ctx, message) => {
    var x = CLOUD_X + FONT_GAP;
    var y = CLOUD_Y + FONT_GAP + CLOUD_Y;

    ctx.font = '16px PT Mono';
    ctx.fillStyle = '#000';

    message.split('\n').forEach((line, i) => { ctx.fillText(line, x, y + FONT_GAP * i) });// Гениально!!!!
  };

  var renderCloud = (ctx, x, y, width, height, color, gap) => {
    ctx.fillStyle = color;
    ctx.fillRect(x + gap, y + gap, width, height);
  };

  window.renderStatistics = (ctx, names, times) => {
    renderCloud(ctx, CLOUD_X, CLOUD_Y, WIDTH_CLOUD, HEIGHT_CLOUD, 'rgba(0, 0, 0, 0.3)', CLOUD_Y);
    renderCloud(ctx, CLOUD_X, CLOUD_Y, WIDTH_CLOUD, HEIGHT_CLOUD, 'rgba(255, 255, 255, 1)', 0);

    var maxTime = window.util.getMaxElement(times);
    var minTime = window.util.getMinElement(times);

    names.forEach((player, i) => {
      ctx.fillStyle = (player === 'Вы') ? 'rgba(255, 0, 0, 1)' : `hsl(240, ${window.util.getRandomNumber(0, 100)}%, ${window.util.getRandomNumber(10, 90)}%)`;
      ctx.fillRect(CLOUD_X + BAR_GAP + (WIDTH_BAR + BAR_GAP) * i, TEXT_Y - FONT_GAP + MINI_GAP, WIDTH_BAR, -(HEIGHT_BAR * times[i]) / maxTime);
      ctx.fillStyle = '#000';
      ctx.fillText(player, TEXT_X + (WIDTH_BAR + BAR_GAP) * i, TEXT_Y + MINI_GAP);
      ctx.fillText(Math.round(times[i]), TEXT_X + (WIDTH_BAR + BAR_GAP) * i, TEXT_Y - FONT_GAP - (HEIGHT_BAR * times[i]) / maxTime);
    });

    var message = (Math.round(times[names.indexOf('Вы')] === minTime)) ?
    `Ура Вы победили! Ваш результат ${times[names.indexOf('Вы')]} мс.`:
    `Жаль, но Вы проиграли 😢\n${names[times.indexOf(minTime)]} был(а), быстрее Вас!`;

    createMessage(ctx, `${message}\nСписок результатов:`);
  };
})();

