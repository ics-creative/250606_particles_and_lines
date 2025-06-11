/* 1. 変数の定義 */
const NUM_POINTS = 400;   // 点群の数を増やす
const MAX_LINE_DIST = 28;  // 線の閾値は小さく
const points = [];

function setup() {
  /* デモ用の設定 */
  const container = document.getElementById('canvas-container');
  const canvas = createCanvas(container.offsetWidth, container.offsetHeight);
  canvas.parent(container);

  /* 2. キャンバスの初期化 */
  // createCanvas(640, 640);
  background(0);
  stroke(255);  //　アルファ値の設定をなくし線をはっきりさせる

  /* 3. 点群の初期化 */
  for (let i = 0; i < NUM_POINTS; i++) {
    const point = {
        x: random(width),
        y: random(height),
        vx: random(-2, 2),  //　速度を大きく
        vy: random(-2, 2),
    };
    points.push(point);
  }
}

function draw() {
  background(0);

  /* 4. 点群のアップデート */
  for (const p of points) {
    p.x += p.vx;
    p.y += p.vy;
    if (p.x < 0 || p.x > width) { 
      p.vx *= -1; 
    }
    if (p.y < 0 || p.y > height) {
       p.vy *= -1; 
    }
    point(p.x, p.y);
  }

  /* 5. 点を線で繋ぐ */
  for (let i = 0; i < points.length; i++) {
    for (let j = i + 1; j < points.length; j++) {
      const d = dist(points[i].x, points[i].y, points[j].x, points[j].y);
      if (d < MAX_LINE_DIST) {
        line(points[i].x, points[i].y, points[j].x, points[j].y);
      }
    }
  }
}