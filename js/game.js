const character = document.querySelector(".game-scene__character");

const originalBottom =
  character.style.bottom || getComputedStyle(character).bottom;

const originalLeft = character.style.left || getComputedStyle(character).left;

const originalWidth =
  character.style.width || getComputedStyle(character).width;

const originalSrc = character.src;

const instruction = document.querySelector(".game-instruction");

let jogoComecou = false;

let characterPosition = parseFloat(originalLeft);
function pular() {
  character.src = "./assets/images/characters/FalkronJumping.png";
  character.style.bottom = "40%";
  character.style.left = "3.5%";
  character.style.width = "clamp(240px, 9vw, 280px)";

  setTimeout(() => {
    character.src = "./assets/images/characters/FalkronWalkingA.png";
    character.style.bottom = originalBottom;
    character.style.left = originalLeft;
    character.style.width = originalWidth;
  }, 400);
}

document.addEventListener("keydown", (event) => {
  if (event.code === "Space") {
    if (!jogoComecou) {
      jogoComecou = true;
      instruction.style.opacity = "0";
      setTimeout(() => {
        instruction.style.display = "none";
      }, 500);
    }
    pular();
  }
});
