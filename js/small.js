/* 1. 変数の定義 */
const NUM_POINTS = 400;   // 点群の数を増やす
const MAX_LINE_DIST = 28;  // 線の閾値は小さく
const points = [];

/* デモ用 */
const BASE_AREA = 960 * 540;
let numPoints =  NUM_POINTS / 2;
let maxLineDist = MAX_LINE_DIST;

function setup() {
  /* 2. キャンバスの初期化 */
  createCanvas(windowWidth, windowHeight);
  // createCanvas(640, 640);
  background(0);
  stroke(255);  //　アルファ値の設定をなくし線をはっきりさせる

  /* デモ用設定 */
  const windowArea = width * height;
  numPoints = floor(NUM_POINTS * windowArea / BASE_AREA);
  numPoints = floor(constrain(numPoints, 100, 600));
  maxLineDist = floor(MAX_LINE_DIST * windowArea / BASE_AREA);
  maxLineDist = floor(constrain(maxLineDist, 28, 48));

  /* 3. 点群の初期化 */
  for (let i = 0; i < numPoints; i++) {
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
      if (d < maxLineDist) {
        line(points[i].x, points[i].y, points[j].x, points[j].y);
      }
    }
  }
}