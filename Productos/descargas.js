const CLAVES_BTN = ["Alias Studio Code"];

const btn = document.querySelector(".btn-pro");

function descargar(href, download) {
  const link = document.createElement("a");

  // Ruta del archivo .exe (tiene que existir en tu servidor)
  link.href = href;

  // Nombre con el que se descargará
  link.download = download;

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

btn.forEach((b, index) => {
  b.addEventListener("click", () => {
    console.log(CLAVES_BTN[index]);

    if (CLAVES_BTN[index] === "Alias Studio Code") {
      descargar("ruta (ZIP/), (.exe dentro de .ZIP)", "nombre"); // 👈 dos argumentos separados
    }
  });
});
