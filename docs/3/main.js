
param = [];

// マウス位置
mouse = {x:0, y:0, clientX:0, clientY:0};

init();

// 初期設定
function init() {

  mouse.x = mouse.clientX = window.innerWidth * 0.5;
  mouse.y = mouse.clientY = window.innerHeight * 0.5;

  $('.js-tg').each(function(i,e) {

    obj = {
      rate:0,            // 最終目標値までの進捗度
      posTg:{x:0, y:0},  // 最終目標位置
      posNow:{x:0, y:0}, // 現在位置
      el:$(e),
      scale:1,
      angle:0
    }
    reset(obj, i * 0.1);
    param.push(obj);

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


// リセット
function reset(obj, delay) {

  sw = window.innerWidth
  sh = window.innerHeight

  obj.rate = 0;
  obj.angle = 0;

  obj.posNow.x = random(0, sw);
  obj.posNow.y = random(0, sh);

  obj.posTg.x = random(0, sw);
  obj.posTg.y = random(0, sh);

  // スケールのランダムに
  obj.scale = random(0.5, 1.5);

  // rate値をアニメーション
  duration = random(0.5, 1.5);
  TweenMax.killTweensOf(obj);
  TweenMax.to(obj, duration, {
    rate:1,
    angle:180,
    ease:Power1.easeOut,
    delay:delay
  })

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

    obj = param[i];

    if(obj.rate > 0) {

      // 進捗度を使って、寄り道しつつ最終的にクリックした位置へ行くように

      // 寄り道位置はマウス
      // 変化が大きくなるようにちょっと調整
      tgX2 = map(mouse.x, -sw * 0.5, sw * 1.5, 0, sw);
      tgY2 = map(mouse.y, -sh * 0.5, sh * 1.5, 0, sh);

      tgX = (tgX2 * (1 - obj.rate)) + (obj.posTg.x * obj.rate);
      tgY = (tgY2 * (1 - obj.rate)) + (obj.posTg.y * obj.rate);
      obj.posNow.x += (tgX - obj.posNow.x) * ease;
      obj.posNow.y += (tgY - obj.posNow.y) * ease;

    }

    // DOM更新
    TweenMax.set(obj.el, {
      x:obj.posNow.x,
      y:obj.posNow.y,
      scale:obj.scale,
      opacity:map(Math.sin(radian(obj.angle)), 0, 1, 0, 1)
    });

    // だいたい1に近づいたら目標値変更
    if(Math.abs(1 - obj.rate) < 0.005) {
      reset(obj, random(0, 0.5));
    }
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
