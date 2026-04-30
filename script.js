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
  ".palabras-flotantes1, .palabras-flotantes2",
);

const video1 = document.querySelector(".video1");
const txt_presentacion = document.querySelector(".txt-presentacion");
const menu_desplegable = document.getElementById("menu-desplegable-barra");
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

/*
 *  Menú desplegable (movil)
 */
function movilePhone() {
  let movilOptn = window.innerWidth <= 745 ? true : false;

  const btns_barra = caja_txt_barra.querySelectorAll("a");
  if (movilOptn === true) {
    menu_desplegable.style.display = "flex";
    video1.style.display = "none";
    palabrasConj.forEach((e) => (e.style.display = "none"));
    btns_barra.forEach((btn) => {
      btn.style.display = "none";
      btn.style.opacity = 0;
    });

    let esAbierto = false;

    menu_desplegable.addEventListener("click", () => {
      esAbierto = !esAbierto;

      const TL = anime.timeline({
        easing: "easeInOutSine",
        duration: 1000,
      });

      TL.add({
        targets: lado_izquierdo,
        opacity: esAbierto ? [1, 0] : [0, 1],
        translateX: esAbierto ? [0, -500] : [-500, 0],
        easing: "cubicBezier(0.68, -0.55, 0.27, 1.55)",
        begin: () => {
          caja_txt_barra.style.width = esAbierto ? "auto" : "";
          caja_txt_barra.style.gap = esAbierto ? "10px" : "25px";
          caja_txt_barra.style.position = esAbierto ? "fixed" : "";
          btns_barra.forEach((btn) => {
            btn.style.fontSize = esAbierto ? "0.75rem" : "1rem";
            btn.style.display = esAbierto ? "flex" : "none";
          });
        },
      })
        .add(
          {
            targets: barra,
            padding: esAbierto ? "0 10px" : "0 40px",
          },
          "-=800",
        )
        .add(
          {
            targets: btns_barra,
            opacity: esAbierto ? [0, 1] : [1, 0],
          },
          "-=600",
        );
    });
  } else {
    menu_desplegable.style.display = "none";
    lado_izquierdo.style.transform = "translateX(0)";
    lado_izquierdo.style.opacity = 1;
    barra.style.padding = "0 40px";
    caja_txt_barra.style.position = "";
    caja_txt_barra.style.width = "";
    caja_txt_barra.style.gap = "25px";
    palabrasConj.forEach((e) => (e.style.display = "flex"));
    video1.style.display = "flex";
    btns_barra.forEach((btn) => {
      btn.style.display = "flex";
      btn.style.opacity = 1;
      btn.style.fontSize = "1rem";
    });
  }
}
movilePhone();

window.addEventListener("resize", () => movilePhone()); //detecta canvios de tamaño en window
