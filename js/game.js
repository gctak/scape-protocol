const character = document.querySelector(".game-scene__character");
const originalBottom =
  character.style.bottom || getComputedStyle(character).bottom;
const originalLeft = character.style.left || getComputedStyle(character).left;
const originalWidth =
  character.style.width || getComputedStyle(character).width;
const instruction = document.querySelector(".game-instruction");
const stopPosition = 15;
const ground = document.querySelector(".game-ground");
const normalWalkSprites = [
  "./assets/images/characters/FalkronWalkingA.png",
  "./assets/images/characters/FalkronWalkingB.png",
];

const downSprites = [
  "./assets/images/characters/FalkronDownA.png",
  "./assets/images/characters/FalkronDownB.png",
];
const scoreDisplay = document.querySelector(".game-hud__score");
const mine = document.querySelector(".game-scene__obstacle--mine");

let groundPosition = 0;
let groundMoving = false;
let gameStarted = false;
let walkFrame = 0;
let characterPosition = 6;
let isJumping = false;
let isDown = false;
let score = 0;
let mineRight = -150;
let mineWaiting = false;
const worldSpeed = 3;

function moveGround() {
  const groundWidthPx = window.innerWidth * 2;
  const deltaPercent = (worldSpeed / groundWidthPx) * 100;

  groundPosition -= deltaPercent;
  if (groundPosition <= -50) {
    groundPosition = 0;
  }
  ground.style.transform = `translateX(${groundPosition}%)`;
  requestAnimationFrame(moveGround);
}

function moveMine() {
  if (!mineWaiting) {
    mineRight += worldSpeed;

    if (mineRight > window.innerWidth) {
      mineWaiting = true;
      const delay = numeroAleatorio(2000, 4000);
      setTimeout(() => {
        mineRight = -150;
        mineWaiting = false;
      }, delay);
    }
  }

  mine.style.right = mineRight + "px";
  requestAnimationFrame(moveMine);
}

function jump() {
  isJumping = true;
  character.src = "./assets/images/characters/FalkronJumping.png";
  character.style.bottom = "40%";
  character.style.width = "clamp(240px, 9vw, 280px)";

  setTimeout(() => {
    character.style.bottom = originalBottom;
    character.style.width = originalWidth;
    isJumping = false;
  }, 400);
}

function walk() {
  setInterval(() => {
    if (!isJumping) {
      const sprites = isDown ? downSprites : normalWalkSprites;
      walkFrame = (walkFrame + 1) % sprites.length;
      character.src = sprites[walkFrame];
    }

    if (characterPosition < stopPosition) {
      characterPosition += 1;
      character.style.left = characterPosition + "%";
    } else if (!groundMoving) {
      groundMoving = true;
      moveGround();
      moveMine();
    }
  }, 200);
}

function startScore() {
  setInterval(() => {
    score += 1;
    scoreDisplay.textContent = String(score).padStart(5, "0");
  }, 1000);
}

document.addEventListener("keydown", (event) => {
  if (event.code === "Space") {
    if (!gameStarted) {
      gameStarted = true;
      instruction.style.opacity = "0";
      setTimeout(() => {
        instruction.style.display = "none";
      }, 500);
      walk();
      startScore();
    }
    jump();
  }
});

function numeroAleatorio(min, max) {
  return Math.random() * (max - min) + min;
}

document.addEventListener("keydown", (event) => {
  if (event.code === "ArrowDown" && !event.repeat) {
    isDown = true;
    character.style.width = "clamp(240px, 9vw, 280px)";
  }
});

document.addEventListener("keyup", (event) => {
  if (event.code === "ArrowDown") {
    isDown = false;
    character.style.width = originalWidth;
  }
});
