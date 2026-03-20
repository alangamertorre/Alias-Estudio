//////////////////////////
// DOM PRINCIPAL /////////
//////////////////////////
const barra = document.querySelector(".barra");
const txt_barra = document.querySelector(".txt-barra");
const logo = document.querySelector(".logo-barra");
const caja_txt_barra = document.querySelector(".caja-txt");
const zona_presentacion = document.querySelector(".zona-presentacion");
const lado_izquierdo = document.querySelector(".lado-izquierdo");
const palabras_flotantes1 = document.querySelector(".palabras-flotantes1");
const palabras_flotantes2 = document.querySelector(".palabras-flotantes2");
const palabras = document.querySelectorAll(".palabra");

const palabrasArray = Array.from(palabras_flotantes1.children);
const palabrasConj = document.querySelectorAll(
  ".palabra, .palabras-flotantes1, .palabras-flotantes2",
);

const video1 = document.querySelector(".video1");
const txt_presentacion = document.querySelector(".txt-presentacion");
const txt_inicio = document.querySelector(".txt-inicio");
const txt_productos = document.querySelector(".txt-productos");
const txt_soporte = document.querySelector(".txt-soporte");
const txt_acerca = document.querySelector(".txt-acerca");
const txt_noticias = document.querySelector(".txt-noticias");
const titulo_presentacion = document.querySelector(".txt-presentacion1");
const titulo_presentacion2 = document.querySelector(".txt-presentacion2");

const presentacion = document.querySelectorAll(
  ".txt-presentacion1, .txt-presentacion2",
);

// Arreglo bug txt_presentación
txt_presentacion.style.transform = "translate(-50%, -50%)";

//////////////////////////
// ANIMACIONES ///////////
//////////////////////////
// Animación de entrada
anime({
  targets: barra,
  translateY: [-150, 0], // empieza más arriba para animación
  opacity: [0, 1],
  duration: 1000,
  easing: "easeOutExpo",
});

anime({
  targets: zona_presentacion,
  translateY: [-150, 0], // empieza más arriba para animación
  opacity: [0, 1],
  duration: 900,
  easing: "easeOutExpo",
});

anime({
  targets: video1,
  opacity: [0, 1],
  duration: 1500,
  easing: "easeOutExpo",
});

anime({
  targets: presentacion,
  translateY: [50, 0],
  opacity: [0, 1],
  duration: 800,
  delay: anime.stagger(170, { start: 500 }),
  easing: "easeOutExpo",
});

//////////////////////////
// Palabras flotantes ////
//////////////////////////

// Shuffle inicial de palabras
for (let i = palabrasArray.length - 1; i > 0; i--) {
  const j = Math.floor(Math.random() * (i + 1));
  palabras_flotantes1.appendChild(palabrasArray[j]);
  palabrasArray.splice(j, 1);
}
// Variables random
let delay1 = Math.random() * 2000 + 1500;

function randomAni() {
  delay1 = Math.random() * 2000 + 1500;
  palabras.forEach((p) => {
    const posX = Math.random() * 200 + 50;
    const posY = Math.random() * 100 + 50;
    p.style.left = posX + "px";
    p.style.top = posY + "px";
  });
}

// Animación de palabras flotantes
if (palabras && palabras.length) {
  anime({
    targets: palabras,
    opacity: [
      { value: [0, 1], duration: 1250 },
      { value: [1, 0], duration: 1250 },
    ],
    textShadow: [
      { value: "0 0 2px #fff, 0 0 5px #fff", duration: 1250 },
      { value: "0 0 5px #fff, 0 0 10px #fff", duration: 1250 },
    ],
    easing: "easeInOutSine",
    loop: true,
    delay: anime.stagger(delay1, { start: 2000 }),
    complete: randomAni,
  });
}

// Ejecutar animación inicial
randomAni();
