document.addEventListener("keydown", (event) => {
  window.location.href = "game.html";
});

const shareButton = document.querySelector(".mobile-warning__share-btn");

shareButton.addEventListener("click", (event) => {
  navigator.share({
    title: "Falkron // Acesso ao Terminal",
    text: "Acesso interrompido. Continue o protocolo em um terminal compatível:",
    url: "https://falkron.com.br",
  });
});
