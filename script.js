const line = document.querySelectorAll(".line-shadow");

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
