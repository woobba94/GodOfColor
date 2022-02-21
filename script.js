const cover = document.querySelector('.cover');
const startBtn = document.querySelector('.start');
const startWrap = document.querySelector('.start-wrap');
startBtn.addEventListener('click', init);

const display = document.querySelector('.display');
const heartList = document.querySelector('.heart-wrap');
const stageBox = document.querySelector('.stage-box');
const resultBox = document.querySelector('.result-box');
let target;
// 레벨이 올라가는 스테이지 단위
const levelUpCount = 5;
const MAX_TIME = 10; // 초단위
const timer = document.querySelector('.timer');
let interval;

let TIME = MAX_TIME;
let stage = 1;
let level = 1;
let failCount = 0;
let colorPoint = 0;
let baseColor = '';
let targetColor = '';
let targetIndex = {
  x: Math.floor(Math.random() * (level + 1)),
  y: Math.floor(Math.random() * (level + 1)),
};

function start() {
  heartList.innerHTML = `<i class="fas fa-heart"></i>
  <i class="fas fa-heart"></i>
  <i class="fas fa-heart"></i>
  <i class="fas fa-heart"></i>
  <i class="fas fa-heart"></i>`;
  stageBox.textContent = `stage : ${stage}`;
  next();
}

function setDisplay() {
  for (let i = 0; i < level + 1; i++) {
    const row = document.createElement('div');
    row.style.height = `${100 / (level + 1)}%`;

    for (let j = 0; j < level + 1; j++) {
      const rowItem = document.createElement('div');
      rowItem.classList += 'item';
      rowItem.style.width = `${100 / (level + 1)}%`;
      // 타겟은 다른색 & 다른 이벤트
      if (isTarget(i, j)) {
        rowItem.classList += ' target';
        rowItem.style.backgroundColor = targetColor;
        rowItem.onclick = success;
      } else {
        rowItem.style.backgroundColor = baseColor;
        rowItem.onclick = fail;
      }
      row.appendChild(rowItem);
    }
    display.appendChild(row);
  }
  target = document.querySelector('.target');
  clickEffect();
}

function next() {
  resetTimer();
  startTimer();
  clearDisplay();
  setBaseColor();
  setTarget();
  setDisplay();
}

function init() {
  startWrap.remove();
  start();
}

function clearDisplay() {
  while (display.hasChildNodes()) {
    display.removeChild(display.firstChild);
  }
}

function setBaseColor() {
  colorPoint = ~~(360 * Math.random());
  baseColor = `hsla(${colorPoint},100%,70%,0.4)`;
}

function setTarget() {
  // 위치
  targetIndex.x = Math.floor(Math.random() * (level + 1));
  targetIndex.y = Math.floor(Math.random() * (level + 1));
  // 타겟 컬러 설정
  // 가중치 k 에 따라 baseColor 와의 차이 조절
  let k = 10 / level - 10;
  if (colorPoint - k < 0) colorPoint += k;
  else colorPoint -= k;
  targetColor = `hsla(${colorPoint},100%,70%,0.4)`;
}

function isTarget(i, j) {
  if (targetIndex.y === i && targetIndex.x === j) return true;
  return false;
}

function success() {
  stage++;
  stageBox.textContent = `stage : ${stage}`;
  if (stage % levelUpCount === 0) {
    level++;
  }
  next();
}

function fail() {
  // console.log('fail');
  heartList.children[heartList.childElementCount - 1 - failCount].classList += ' heart-empty';
  failCount++;
  if (failCount === 5) {
    clearInterval(interval);
    end();
    result();
  }
}

// 타이머 관련
function resetTimer() {
  clearInterval(interval);
  TIME = MAX_TIME;
  timer.textContent = Math.floor(TIME);
}

// 타이머 시작 (리셋 및 시간줄이기)
function startTimer() {
  // .5초마다 수행
  interval = setInterval(updateTimer, 500);
}

function updateTimer() {
  timer.textContent = Math.floor(TIME);
  TIME -= 0.5;
  if (TIME < 0) {
    fail();
    if (failCount < 5) {
      success();
    }
  }
}

function end() {
  const target = document.querySelector('.target');
  target.style.boxShadow = `inset 0px 0px ${20 / level + 2}px #000000`;
  cover.style.zIndex = '10';
}

function result() {
  let result = '';
  if (stage >= levelUpCount * 15) result = '내 사이트를 해킹하지 마십시오.';
  else if (stage >= levelUpCount * 11) result = '당신은 혹시.. 신입니까?';
  else if (stage >= levelUpCount * 10) result = '당신의 감각은 인류의 자랑거리입니다.';
  else if (stage >= levelUpCount * 9) result = '당신의 능력은 연구대상입니다.';
  else if (stage >= levelUpCount * 8) result = '당신의 야생동물적인 감각을 가지고 있습니다.';
  else if (stage >= levelUpCount * 6) result = '당신의 컬러감각은 미대생 수준입니다.';
  else if (stage >= levelUpCount * 2) result = '당신의 컬러감각은 일반적인 수준입니다.';
  else if (stage >= levelUpCount) result = '당신은 초보수준 컬러감각을 가지고 있습니다.';
  else result = '음.. 조금만 제대로 플레이 해보시겠습니까?';

  resultBox.innerHTML = `최종 스테이지 : ${stage}<br>
  <p class="result-text">${result}</p>
  <button class="restart">다시 도전</button>`;
  const restartBtn = document.querySelector('.restart');
  restartBtn.addEventListener('click', restart);
}

function restart() {
  TIME = MAX_TIME;
  stage = 1;
  level = 1;
  failCount = 0;
  colorPoint = 0;
  baseColor = '';
  targetColor = '';
  targetIndex = {
    x: Math.floor(Math.random() * (level + 1)),
    y: Math.floor(Math.random() * (level + 1)),
  };
  cover.style.zIndex = '-10';
  resultBox.innerHTML = '';
  start();
}

//
function clickEffect() {
  let balls = [];
  let longPressed = false;
  let longPress;
  let multiplier = 0;
  let width, height;
  let origin;
  let normal;
  let ctx;
  const canvas = document.createElement('canvas');
  document.body.appendChild(canvas);
  canvas.setAttribute(
    'style',
    'width: 100%; height: 100%; top: 0; left: 0; z-index: 99999; position: fixed; pointer-events: none;'
  );

  if (canvas.getContext && window.addEventListener) {
    ctx = canvas.getContext('2d');
    updateSize();
    window.addEventListener('resize', updateSize, false);
    loop();
    target.addEventListener(
      'mousedown',
      function (e) {
        pushBalls(randBetween(stage / 2 + 1, stage + 1), e.clientX, e.clientY);
        target.classList.add('is-pressed');
        longPress = setTimeout(function () {
          target.classList.add('is-longpress');
          longPressed = true;
        }, 500);
      },
      false
    );
    target.addEventListener(
      'mouseup',
      function (e) {
        clearInterval(longPress);
        if (longPressed == true) {
          target.classList.remove('is-longpress');
          pushBalls(
            randBetween(50 + Math.ceil(multiplier), 100 + Math.ceil(multiplier)),
            e.clientX,
            e.clientY
          );
          longPressed = false;
        }
        target.classList.remove('is-pressed');
      },
      false
    );
  } else {
    console.log('canvas error');
  }

  function updateSize() {
    canvas.width = window.innerWidth * 2;
    canvas.height = window.innerHeight * 2;
    canvas.style.width = window.innerWidth + 'px';
    canvas.style.height = window.innerHeight + 'px';

    ctx.scale(2, 2);
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    origin = {
      x: width / 2,
      y: height / 2,
    };
    normal = {
      x: width / 1.2,
      y: height / 1.2,
    };
  }
  class Ball {
    constructor(x = origin.x, y = origin.y) {
      this.x = x;
      this.y = y;
      // console.log(`x : ${x}, y : ${y}`);
      this.angle = Math.PI * 2 * Math.random();
      if (longPressed == true) {
        this.multiplier = randBetween(14 + multiplier, 15 + multiplier);
      } else {
        this.multiplier = randBetween(stage / 2, stage / 2);
      }
      this.vx = (this.multiplier + Math.random() * 0.5) * Math.cos(this.angle);
      this.vy = (this.multiplier + Math.random() * 0.5) * Math.sin(this.angle);
      this.r = randBetween(8, 12) + 3 * Math.random();
      this.color = targetColor;
    }
    update() {
      this.x += this.vx - normal.x;
      this.y += this.vy - normal.y;
      normal.x = (-2 / window.innerWidth) * Math.sin(this.angle);
      normal.y = (-2 / window.innerHeight) * Math.cos(this.angle);
      this.r -= 0.3;
      this.vx *= 0.9;
      this.vy *= 0.9;
    }
  }

  function pushBalls(count = 1, x = origin.x, y = origin.y) {
    for (let i = 0; i < count; i++) {
      balls.push(new Ball(x, y));
    }
  }

  function randBetween(min, max) {
    return Math.floor(Math.random() * max) + min;
  }

  function loop() {
    ctx.fillStyle = 'rgba(255, 255, 255, 0)';
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < balls.length; i++) {
      let b = balls[i];
      if (b.r < 0) continue;
      ctx.fillStyle = b.color;
      ctx.beginPath();
      ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2, false);
      ctx.fill();
      b.update();
    }
    if (longPressed == true) {
      multiplier += 0.2;
    } else if (!longPressed && multiplier >= 0) {
      multiplier -= 0.4;
    }
    removeBall();
    requestAnimationFrame(loop);
  }

  function removeBall() {
    for (let i = 0; i < balls.length; i++) {
      let b = balls[i];
      if (b.x + b.r < 0 || b.x - b.r > width || b.y + b.r < 0 || b.y - b.r > height || b.r < 0) {
        balls.splice(i, 1);
      }
    }
  }
}
