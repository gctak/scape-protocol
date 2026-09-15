const instruction = document.querySelector(".game-instruction");
const sprites = [
  "./assets/images/characters/FalkronWalkingA.png",
  "./assets/images/characters/FalkronWalkingB.png",
];
const character = document.querySelector(".game-scene__character");
let walkFrame = 0;
let characterPosition = 6;
let gameStarted = false;

function walk() {
  changeSprites();
  setInterval(() => {
    changeSprites();
  }, 250);
  moveCharacter();
}
//Troca as sprites
function changeSprites() {
  walkFrame = (walkFrame + 1) % 2;
  character.src = sprites[walkFrame];
}

//Aumenta a posição horizontal do personagem
function moveCharacter() {
  characterPosition += 0.25;
  character.style.left = characterPosition + "%";

  requestAnimationFrame(moveCharacter);
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
      //Altera a proporção do personagem
      character.style.width = "clamp(190px, 9vw, 230px)";
      //Personagem começa a andar
      walk();
    }
  }
});
