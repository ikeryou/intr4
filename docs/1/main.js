
// 最終目標値までの進捗度
rate = 0;

// 最終目標値
clickPos = {x:0, y:0};

// 現在値
movePos = {x:0, y:0};

init();


// 初期設定
function init() {

  // ステージサイズ
  sw = window.innerWidth
  sh = window.innerHeight

  // 最初はランダム
  clickPos.x = random(0, sw);
  clickPos.y = random(0, sh);

  // クリックしたところを最終目標値に
  $(window).on('click', _eClick);

}


// 毎フレーム実行
window.requestAnimationFrame(update);
function update() {

  // ステージサイズ
  sw = window.innerWidth
  sh = window.innerHeight

  // イージングかける
  ease = 0.07;

  // 進捗度 1へ近づける
  rate += (1 - rate) * ease;

  // だいたい1に近づいたら目標値変更
  if(Math.abs(1 - rate) < 0.005) {
    _eClick();
  }

  // 寄り道ターゲット
  tg = $('.js-tg');

  // 画面真ん中へ寄り道
  tgX = sw * 0.5;
  tgY = sh * 0.5;

  // 動かすやつ
  move = $('.js-move');

  // 進捗度を使って、寄り道しつつ最終的にクリックした位置へ行くように
  moveX = (tgX * (1 - rate)) + (clickPos.x * rate);
  moveY = (tgY * (1 - rate)) + (clickPos.y * rate);
  movePos.x += (moveX - movePos.x) * ease;
  movePos.y += (moveY - movePos.y) * ease;

  // DOM更新
  TweenMax.set(move, {
    x:movePos.x,
    y:movePos.y
  });
  TweenMax.set(tg, {
    x:tgX,
    y:tgY
  });

  window.requestAnimationFrame(update);
}

// ----------------------------------------
// イベント 画面クリック
// ----------------------------------------
function _eClick(e) {

  rate = 0;

  if(e == null) {
    clickPos.x = random(0, window.innerWidth);
    clickPos.y = random(0, window.innerHeight);
  } else {
    clickPos.x = e.clientX;
    clickPos.y = e.clientY;
  }

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
