const instruction = document.querySelector(".game-instruction");
const sprites = [
  "./assets/images/characters/FalkronWalkingA.png",
  "./assets/images/characters/FalkronWalkingB.png",
];
const character = document.querySelector(".game-scene__character");
let walkFrame = 0;
let characterPosition = 6;
let gameStarted = false;
let groundMoving = false;
let groundPosition = 0;
const ground = document.querySelector(".game-ground");
const worldSpeed = 4;
let score = 0;
const scoreElement = document.querySelector(".game-hud__score");
const jumpTotalTime = 600;
const maximumJumpHeight = 40;
let startTime;
let isJumping = false;

function walk() {
  changeSprites();
  setInterval(() => {
    changeSprites();
  }, 250);
  moveCharacter();
}

function changeSprites() {
  if (!isJumping) {
    walkFrame = (walkFrame + 1) % 2;
    character.src = sprites[walkFrame];
    //Altera a proporção do personagem
    character.style.width = "clamp(190px, 9vw, 230px)";
  }
}

//Aumenta a posição horizontal do personagem
function moveCharacter() {
  if (characterPosition < 30) {
    characterPosition += 0.25;
    character.style.left = characterPosition + "%";
    requestAnimationFrame(moveCharacter);
  } else {
    //Chão assume o movimento
    if (!groundMoving) {
      groundMoving = true;
      moveGround();
    }
  }
}

function moveGround() {
  const deltaPercent = (worldSpeed / (window.innerWidth * 2)) * 100;
  groundPosition -= deltaPercent;
  if (groundPosition <= -50) {
    groundPosition = 0;
  }
  ground.style.transform = `translateX(${groundPosition}%)`;
  requestAnimationFrame(moveGround);
}

function startScore() {
  setInterval(() => {
    score += 1;
    scoreElement.textContent = score.toString().padStart(5, "0");
  }, 1000);
}

function jump() {
  startTime = performance.now();
  isJumping = true;
  //Altera a sprite do personagem
  character.src = "./assets/images/characters/FalkronJumping.png";
  //Altera a proporção do personagem
  character.style.width = "clamp(240px, 9vw, 260px)";
  requestAnimationFrame(loopJump);
}

function loopJump(now) {
  const timePassed = now - startTime;
  const progress = timePassed / jumpTotalTime;
  const extraHeight = maximumJumpHeight * 4 * progress * (1 - progress);
  if (progress >= 1) {
    character.style.bottom = 12 + "%";
    isJumping = false;
  } else {
    character.style.bottom = 12 + extraHeight + "%";
    requestAnimationFrame(loopJump);
  }
}

document.addEventListener("keydown", (event) => {
  if (event.code === "Space") {
    if (!gameStarted) {
      gameStarted = true;
      //Some a instrução
      instruction.style.opacity = "0";
      setTimeout(() => {
        instruction.style.display = "none";
      }, 500);
      //Personagem começa a andar
      walk();
      //Score começa a contar
      startScore();
    }
    //Personagem pula
    jump();
  }
});
