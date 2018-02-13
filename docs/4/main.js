
param = [];

// マウス位置
mouse = {x:0, y:0, clientX:0, clientY:0};

init();

// 初期設定
function init() {

  mouse.x = mouse.clientX = window.innerWidth * 0.5;
  mouse.y = mouse.clientY = window.innerHeight * 0.5;

  $('.mv .inner').each(function(i,e) {

    o = {
      rate:0,
      now:{x:0, y:0},
      tg1:{x:0, y:0},
      tg2:{x:0, y:0},
      color:chroma.random().css(),
      edgeColor:chroma.random().css(),
      el:$(e)
    };

    reset(o);
    param.push(o);

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

  len = param.length;
  for(var i = 0; i < len; i++) {

    o = param[i];

    tgX = o.tg1.x * (1 - o.rate) + o.tg2.x * o.rate;
    tgY = o.tg1.y * (1 - o.rate) + o.tg2.y * o.rate;

    o.now.x += (tgX - o.now.x) * ease;
    o.now.y += (tgY - o.now.y) * ease;

    range = 90;
    ang = map(o.now.x, -range, range, 0, sw);



    pct = 100 - (o.now.y / sh) * 100;

    grad = 'linear-gradient(' + ang + 'deg, ' + o.edgeColor + ' 0%, ';
    grad += o.color + ' ' + pct + '%, ';
    grad += o.edgeColor + ' 100%)';

    o.el.css({
      background:grad
    });

    if(o.rate >= 1) {
      reset(o);
    }

  }





  window.requestAnimationFrame(update);
}



// リセット
function reset(obj) {

  sw = window.innerWidth
  sh = window.innerHeight

  obj.rate = 0;

  obj.now.x = random(0, sw);
  obj.now.y = sh;

  obj.tg1.x = random(0, sw);
  obj.tg1.y = sh * 0.5;

  obj.tg2.x = sw * 0.5;
  obj.tg2.y = 0;

  obj.color = chroma.random().css();
  obj.edgeColor = chroma(obj.color).brighten(10).css();

  // rate値をアニメーション
  duration = 1.5;
  TweenMax.killTweensOf(obj);
  TweenMax.to(obj, duration, {
    rate:1,
    ease:Power1.easeOut,
    delay:0
  })

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
