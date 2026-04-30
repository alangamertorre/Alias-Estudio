const line = document.querySelectorAll(".line-shadow");
const barra = document.querySelector(".barra");
const caja_txt_barra = document.querySelector(".caja-txt");
const menu_desplegable = document.getElementById("menu-desplegable-barra");
const lado_izquierdo = document.querySelector(".lado-izquierdo");

//////////////////////////
// ANIMACIONES ///////////
//////////////////////////

// Sin import, anime() es global desde el CDN

anime({
  targets: ".barra",
  translateY: [-150, 0],
  opacity: [0, 1],
  duration: 1000,
  easing: "easeOutExpo",
});

anime({
  targets: ".txt-pro",
  opacity: [0, 1],
  translateY: [-150, 0],
  easing: "easeInOutBack",
  duration: 800,
  complete: () => {
    anime({
      targets: ".productos",
      scale: [0.75, 1],
      opacity: 1,
      duration: 600,
      easing: "cubicBezier(1, 0.295, 0, 0.98)",
      complete: () => {
        anime
          .timeline({
            easing: "cubicBezier(1, 0.295, 0, 0.98)",
          })
          .add({
            targets: ".line-shadow",
            opacity: [0, 1],
            boxShadow: "0px 10px 20px rgba(167, 164, 164, 0.6)",
            duration: 800,
            complete: () => {
              anime({
                targets: ".caja-pro",
                translateY: [-80, 0],
                opacity: 1,
                duration: 700,
                delay: anime.stagger(150),
              });

              anime({
                targets: ".line-shadow",
                opacity: [1, 0],
                boxShadow: "none",
                duration: 400,
              });
            },
          });
      },
    });
  },
});

/*
 *  Menú desplegable (movil)
 */
function movilePhone() {
  let movilOptn = window.innerWidth <= 745 ? true : false;

  const btns_barra = caja_txt_barra.querySelectorAll("a");
  if (movilOptn === true) {
    menu_desplegable.style.display = "flex";
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
    btns_barra.forEach((btn) => {
      btn.style.display = "flex";
      btn.style.opacity = 1;
      btn.style.fontSize = "1rem";
    });
  }
}
movilePhone();

window.addEventListener("resize", () => movilePhone()); //detecta canvios de tamaño en window
