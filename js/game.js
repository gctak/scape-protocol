const character = document.querySelector(".game-scene__character");
const originalBottom =
  character.style.bottom || getComputedStyle(character).bottom;
const originalLeft = character.style.left || getComputedStyle(character).left;
const originalWidth =
  character.style.width || getComputedStyle(character).width;
const instruction = document.querySelector(".game-instruction");
const walkSprites = [
  "./assets/images/characters/FalkronWalkingA.png",
  "./assets/images/characters/FalkronWalkingB.png",
];
let jogoComecou = false;
let walkFrame = 0;
let characterPosition = 6;
let isJumping = false;

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
      walkFrame = (walkFrame + 1) % walkSprites.length;
      character.src = walkSprites[walkFrame];
    }
    characterPosition += 1;
    character.style.left = characterPosition + "%";
  }, 200);
}

document.addEventListener("keydown", (event) => {
  if (event.code === "Space") {
    if (!jogoComecou) {
      jogoComecou = true;
      instruction.style.opacity = "0";
      setTimeout(() => {
        instruction.style.display = "none";
      }, 500);
      walk();
    }
    jump();
  }
});
