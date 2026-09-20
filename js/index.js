document.addEventListener("keydown", (event) => {
  window.location.href = "/scape-protocol";
});

const shareButton = document.querySelector(".mobile-warning__share-btn");

shareButton.addEventListener("click", async () => {
  if (navigator.share) {
    try {
      await navigator.share({
        title: document.title,
        text: "Acesso interrompido. Continue o protocolo em um terminal compatível:",
        url: window.location.href,
      });
      console.log("Compartilhado com sucesso!");
    } catch (error) {
      console.log("Erro ao compartilhar:", error);
    }
  } else {
    alert("A API de compartilhamento não é suportada neste navegador.");
  }
});
