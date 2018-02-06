
param = [];

init();

// 初期設定
function init() {

  $('.js-tg').each(function(i,e) {

    obj = {
      rate:0,            // 最終目標値までの進捗度
      posTg2:{x:0, y:0}, // 最終目標位置
      posTg1:{x:0, y:0}, // 寄り道位置
      posNow:{x:0, y:0}, // 現在位置
      el:$(e),
      scale:1,
      isStart:false
    }
    reset(obj, i * 0.3);
    param.push(obj);

  });

}


// リセット
function reset(obj, delay) {

  sw = window.innerWidth
  sh = window.innerHeight

  obj.rate = 0;

  obj.posNow.x = random(sw * 0.25, sw * 0.75);
  obj.posNow.y = sh * 1.25;

  // 最終目標位置 画面外へ
  obj.posTg2.x = sw * 0.5;
  obj.posTg2.y = -sh * 0.2;

  // 寄り道
  range = 1;
  obj.posTg1.x = obj.posNow.x + random(-sw * range, sw * range);
  obj.posTg1.y = random(sh * 0.4, sh * 0.6);

  // スケールのランダムに
  obj.scale = random(0.5, 1);

  // rate値をアニメーション
  TweenMax.killTweensOf(obj);
  TweenMax.to(obj, 1, {
    rate:1,
    ease:Power3.easeOut,
    delay:delay
  })

}


// 毎フレーム実行
window.requestAnimationFrame(update);
function update() {

  // イージングかける
  ease = 0.08;

  len = param.length;
  for(var i = 0; i < len; i++) {

    obj = param[i];

    if(obj.rate > 0) {
      // 進捗度を使って、寄り道しつつ最終的にクリックした位置へ行くように
      tgX = (obj.posTg1.x * (1 - obj.rate)) + (obj.posTg2.x * obj.rate);
      tgY = (obj.posTg1.y * (1 - obj.rate)) + (obj.posTg2.y * obj.rate);
      obj.posNow.x += (tgX - obj.posNow.x) * ease;
      obj.posNow.y += (tgY - obj.posNow.y) * ease;
    }

    // DOM更新
    TweenMax.set(obj.el, {
      x:obj.posNow.x,
      y:obj.posNow.y,
      scale:obj.scale
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
