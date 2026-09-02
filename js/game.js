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
let groundPosition = 0;
let groundMoving = false;
let gameStarted = false;
let walkFrame = 0;
let characterPosition = 6;
let isJumping = false;
let isDown = false;
const scoreDisplay = document.querySelector(".game-hud__score");
let score = 0;

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
    }
  }, 200);
}

function moveGround() {
  groundPosition -= 0.15;
  if (groundPosition <= -50) {
    groundPosition = 0;
  }
  ground.style.transform = `translateX(${groundPosition}%)`;
  requestAnimationFrame(moveGround);
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
