'use strict';

const WIDTH_CLOUD = 420;
const HEIGHT_CLOUD = 270;
const CLOUD_X = 100;
const CLOUD_Y = 10;
const MINI_GAP = 7;
const GAP = 15;
const FONT_GAP = 20;
const WIDTH_BAR = 40;
const HEIGHT_BAR = 150;
const BAR_GAP = 50;
const TEXT_X = CLOUD_X + BAR_GAP;
const TEXT_Y = 265;

const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getMaxElement = (arr) => {
  return Math.max.apply(null, arr);
};

const getMinElement = (arr) => {
  return Math.min.apply(null, arr);
};

const createMessage = (ctx, message) => {
  let x = CLOUD_X + FONT_GAP;
  let y = CLOUD_Y + FONT_GAP + CLOUD_Y;

  ctx.font = '16px PT Mono';
  ctx.fillStyle = '#000';

  message.split('\n').forEach((line, i) => { ctx.fillText(line, x, y + FONT_GAP * i) });// Гениально!!!!
};

const renderCloud = (ctx, x, y, width, height, color, gap) => {
  ctx.fillStyle = color;
  ctx.fillRect(x + gap, y + gap, width, height);
};

window.renderStatistics = (ctx, names, times) => {
  renderCloud(ctx, CLOUD_X, CLOUD_Y, WIDTH_CLOUD, HEIGHT_CLOUD, 'rgba(0, 0, 0, 0.3)', CLOUD_Y);
  renderCloud(ctx, CLOUD_X, CLOUD_Y, WIDTH_CLOUD, HEIGHT_CLOUD, 'rgba(255, 255, 255, 1)', 0);

  const maxTime = getMaxElement(times);
  const minTime = getMinElement(times);

  names.forEach((player, i) => {
    ctx.fillStyle = (player === 'Вы') ? 'rgba(255, 0, 0, 1)' : `hsl(240, ${getRandomNumber(0, 100)}%, ${getRandomNumber(10, 90)}%)`;
    ctx.fillRect(CLOUD_X + BAR_GAP + (WIDTH_BAR + BAR_GAP) * i, TEXT_Y - FONT_GAP + MINI_GAP, WIDTH_BAR, -(HEIGHT_BAR * times[i]) / maxTime);
    ctx.fillStyle = '#000';
    ctx.fillText(player, TEXT_X + (WIDTH_BAR + BAR_GAP) * i, TEXT_Y + MINI_GAP);
    ctx.fillText(Math.round(times[i]), TEXT_X + (WIDTH_BAR + BAR_GAP) * i, TEXT_Y - FONT_GAP - (HEIGHT_BAR * times[i]) / maxTime);
  });

  let message = (Math.round(times[names.indexOf('Вы')] === minTime)) ?
    'Ура Вы победили!' :
    `Жаль, но Вы проиграли 😢\n${names[times.indexOf(minTime)]} был(а), быстрее Вас!`;

  createMessage(ctx, `${message}\nСписок результатов:`);
};
