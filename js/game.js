const instruction = document.querySelector(".game-instruction");
const walkingSprites = [
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
const jumpTotalTime = 1100;
const maximumJumpHeight = 35;
let startTime;
let isJumping = false;
const downSprites = [
  "./assets/images/characters/FalkronDownA.png",
  "./assets/images/characters/FalkronDownB.png",
];
let isDown = false;
let minePosition = -150;
const mine = document.querySelector(".game-scene__obstacle--mine");
let isMineHidden = false;
let isGameOver = false;
let walkInterval;
let scoreInterval;
const tolerance = 15;

function walk() {
  changeSprites();
  walkInterval = setInterval(() => {
    changeSprites();
  }, 250);
  moveCharacter();
}

function changeSprites() {
  //Altera os sprites caso o comando de agachar estiver sendo usado
  const sprites = isDown ? downSprites : walkingSprites;
  if (!isJumping) {
    //Altera a proporção do personagem dependendo das sprites a serem usadas
    character.style.width = isDown
      ? "clamp(230px, 9vw, 250px)"
      : "clamp(190px, 9vw, 230px)";
    walkFrame = (walkFrame + 1) % 2;
    character.src = sprites[walkFrame];
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
      //Mina começa a se movimentar
      moveMine();
    }
  }
}

function moveGround() {
  if (!isGameOver) {
    const deltaPercent = (worldSpeed / (window.innerWidth * 2)) * 100;
    groundPosition -= deltaPercent;
    if (groundPosition <= -50) {
      groundPosition = 0;
    }
    ground.style.transform = `translateX(${groundPosition}%)`;
    requestAnimationFrame(moveGround);
  }
}

function startScore() {
  scoreInterval = setInterval(() => {
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
  character.style.width = "clamp(180px, 9vw, 200px)";
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

function moveMine() {
  if (!isMineHidden) {
    minePosition += worldSpeed;
    mine.style.right = minePosition + "px";
    if (minePosition >= window.innerWidth) {
      isMineHidden = true;
      setTimeout(
        () => {
          isMineHidden = false;
          minePosition = -150;
        },
        randomNumber(2000, 4000),
      );
    }
  }
  if (checkCollision(character, mine)) {
    isGameOver = true;
    character.src = "./assets/images/characters/FalkronGameOverMine.png";
    character.style.width = "clamp(220px, 9vw, 240px)";
    clearInterval(walkInterval);
    clearInterval(scoreInterval);
  }
  if (!isGameOver) {
    requestAnimationFrame(moveMine);
  }
}

function randomNumber(min, max) {
  return Math.random() * (max - min) + min;
}

function checkCollision(element1, element2) {
  const rect1 = element1.getBoundingClientRect();
  const rect2 = element2.getBoundingClientRect();
  return !(
    rect1.right - tolerance < rect2.left + tolerance ||
    rect2.right - tolerance < rect1.left + tolerance ||
    rect1.bottom - tolerance < rect2.top + tolerance ||
    rect2.bottom - tolerance < rect1.top + tolerance
  );
}

//Lógica do espaço
document.addEventListener("keydown", (event) => {
  if (isGameOver) return;
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

//lógica da seta para baixo
document.addEventListener("keydown", (event) => {
  if (isGameOver) return;
  if (event.code === "ArrowDown") {
    isDown = true;
  }
});

document.addEventListener("keyup", (event) => {
  if (isGameOver) return;
  if (event.code === "ArrowDown") {
    isDown = false;
  }
});
