
param = [];

// マウス位置
mouse = {x:0, y:0, clientX:0, clientY:0};

init();

// 初期設定
function init() {

  mouse.x = mouse.clientX = window.innerWidth * 0.5;
  mouse.y = mouse.clientY = window.innerHeight * 0.5;

  $('.mv .inner').each(function(i,e) {

    // color = chroma.random();

    param.push({
      rate:0,
      x:0,
      angle:0,
      tgX1:random(0, window.innerWidth),
      tgX2:random(0, window.innerWidth),
      color:chroma.random().css(),
      // edgeColor:chroma.random().css(),
      edgeColor:chroma.random().css(),
      el:$(e)
    });

  });

  $(window).on('mousemove', _eMouseMove);

}


// ----------------------------------------
// イベント マウス動かす
// ----------------------------------------
function _eMouseMove(e) {

  mouse.clientX = e.clientX;
  mouse.clientY = e.clientY;

}


// 毎フレーム実行
window.requestAnimationFrame(update);
function update() {

  sw = window.innerWidth
  sh = window.innerHeight

  // イージングかける
  ease = 0.08;

  mouse.x += (mouse.clientX - mouse.x) * 0.2;
  mouse.y += (mouse.clientY - mouse.y) * 0.2;

  rate = map(mouse.x, 0, 1, 0, sw);

  len = param.length;
  for(var i = 0; i < len; i++) {

    o = param[i];

    o.tgX1 = sw * 0.5;
    // o.tgX2 = sw;

    // o.tgX1 = sw * 0.5;
    // o.tgX2 =

    xRate = map(mouse.x, 0, 1, 0, sw);
    tgX = o.tgX1 * (1 - xRate) + o.tgX2 * xRate;
    o.x += (tgX - o.x) * ease;

    //colorRata = map(mouse.x, 0, 1, 0, sw);

    ang1 = 90;
    ang2 = 270;

    ang = ang1 * (1 - rate) + ang2 * rate;

    grad = 'linear-gradient(' + ang + 'deg, ' + o.edgeColor + ' 0%, ';
    grad += o.color + ' ' + ((o.x / sw) * 100) + '%, ';
    grad += o.edgeColor + ' 100%)';

    o.el.css({
      background:grad
    });

  }





  window.requestAnimationFrame(update);
}




// ----------------------------------------
// 度からラジアンに変換
// @val : 度
// ----------------------------------------
function radian(val) {
  return val * Math.PI / 180;
}

// ----------------------------------------
// ラジアンから度に変換
// @val : ラジアン
// ----------------------------------------
function degree(val) {
  return val * 180 / Math.PI;
}

// ----------------------------------------
// minからmaxまでランダム
// ----------------------------------------
function random(min, max) {
  return Math.random() * (max - min) + min;
}

// ----------------------------------------
// 範囲変換
// @val     : 変換したい値
// @toMin   : 変換後の最小値
// @toMax   : 変換後の最大値
// @fromMin : 変換前の最小値
// @fromMax : 変換前の最大値
// ----------------------------------------
function map(val, toMin, toMax, fromMin, fromMax) {
  if(val <= fromMin) {
    return toMin;
  }
  if(val >= fromMax) {
    return toMax;
  }
  p = (toMax - toMin) / (fromMax - fromMin);
  return ((val - fromMin) * p) + toMin;
}
