const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// ハエの個体数
const numFlies = 100;
// ハエのオブジェクト
const flies = [];

// 初期設定
function init() {
  // キャンバスのサイズ設定
  canvas.width = 600;
  canvas.height = 400;

  // ハエの初期化
  for (let i = 0; i < numFlies; i++) {
    flies.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
      // 視覚範囲
      visionRange: 50,
      // 餌を見つけたかどうか
      foundFood: false,
    });
  }
}

// ハエの更新
function update() {
  // ハエを移動させる
  flies.forEach((fly) => {
    fly.x += fly.vx;
    fly.y += fly.vy;

    // キャンバスの境界で跳ね返らせる
    if (fly.x < 0 || fly.x > canvas.width) {
      fly.vx = -fly.vx;
    }
    if (fly.y < 0 || fly.y > canvas.height) {
      fly.vy = -fly.vy;
    }
  });
}

// 描画
function draw() {
  // キャンバスをクリアする
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // ハエを描画する
  flies.forEach((fly) => {
    ctx.beginPath();
    ctx.arc(fly.x, fly.y, 5, 0, Math.PI * 2);
    ctx.fillStyle = fly.foundFood ? 'green' : 'blue';
    ctx.fill();
  });
}

// メインループ
function loop() {
  update();
  draw();
  requestAnimationFrame(loop);
}

init();
loop();
