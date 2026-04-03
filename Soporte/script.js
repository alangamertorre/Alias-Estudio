const barra = document.querySelector(".barra");
const txt_inicio = document.querySelector(".txt-con-pri");
const img_inicio = document.querySelector(".img-soporte");
const opciones = document.querySelectorAll(
  ".help-ia, .help-gmail, .help-manual",
);
const Gmail = document.querySelector(".optn-gmail");

// Animaciones de entrada...
anime({
  targets: barra,
  translateY: [-150, 0],
  opacity: [0, 1],
  duration: 1000,
  easing: "easeOutExpo",
});
anime({
  targets: txt_inicio,
  translateX: [-150, 0],
  opacity: [0, 1],
  duration: 1000,
  easing: "easeOutExpo",
  delay: 500,
});
anime({
  targets: img_inicio,
  opacity: [0, 1],
  scale: [0.2, 1],
  easing: "easeOutExpo",
  duration: 2000,
  delay: 700,
});
anime({
  targets: opciones,
  translateY: [window.innerHeight, 0],
  opacity: [0, 1],
  duration: 1000,
  easing: "easeInOutExpo",
  delay: anime.stagger(200),
  complete: () => opciones.forEach((op) => (op.style.transform = "")),
});

// Gmail
let GMAIL_VISIBLE = false; // ✅ solo una vez

opciones[2].addEventListener("click", () => {
  GMAIL_VISIBLE = !GMAIL_VISIBLE;
  if (GMAIL_VISIBLE) {
    Gmail.style.pointerEvents = "auto";
    anime({
      targets: Gmail,
      opacity: [0, 1],
      duration: 500,
      easing: "easeOutExpo",
    });
  } else {
    anime({
      targets: Gmail,
      opacity: [1, 0],
      duration: 500,
      easing: "easeInExpo",
      complete: () => {
        Gmail.style.pointerEvents = "none";
      },
    });
  }
});

document.addEventListener("click", (e) => {
  if (
    GMAIL_VISIBLE &&
    !Gmail.contains(e.target) &&
    !opciones[2].contains(e.target)
  ) {
    GMAIL_VISIBLE = false;
    anime({
      targets: Gmail,
      opacity: [1, 0],
      duration: 500,
      easing: "easeInExpo",
      complete: () => {
        Gmail.style.pointerEvents = "none";
      },
    });
  }
});

//Enviar EMAIl

function sendEmail() {
  const nombre = document.getElementById("nombre").value.trim();
  const email = document.getElementById("email").value.trim();
  const mensaje = document.getElementById("mensaje").value.trim();

  // ✅ todos los campos obligatorios
  if (!nombre || !email || !mensaje) {
    alert("❌ Por favor, completa todos los campos antes de enviar.");
    return;
  }

  const params = { name: nombre, email: email, message: mensaje };

  emailjs
    .send("service_mlbl5qa", "template_37buo97", params)
    .then(() => {
      alert("✅ Mensaje enviado correctamente.");
      anime({
        targets: Gmail,
        opacity: [1, 0],
        duration: 500,
        easing: "easeInExpo",
        complete: () => {
          Gmail.style.pointerEvents = "none";
          GMAIL_VISIBLE = false;
        },
      });
    })
    .catch((error) =>
      alert(
        "❌ Error al enviar: " + error.text + ". Vuelva a intentarlo después.",
      ),
    );
}

//Opcion 2: IA
const ia = document.querySelector(".optn-ia");
let IA_VISIBLE = false;

opciones[0].addEventListener("click", () => {
  IA_VISIBLE = !IA_VISIBLE;
  if (IA_VISIBLE) {
    ia.style.pointerEvents = "auto";
    anime({
      targets: ia,
      opacity: [0, 1],
      duration: 500,
      easing: "easeOutExpo",
    });
  } else {
    cerrarIA();
  }
});

document.addEventListener("click", (e) => {
  if (IA_VISIBLE && !ia.contains(e.target) && !opciones[0].contains(e.target)) {
    cerrarIA();
  }
});

function cerrarIA() {
  anime({
    targets: ia,
    opacity: [1, 0],
    duration: 500,
    easing: "easeInExpo",
    complete: () => {
      ia.style.pointerEvents = "none";
      IA_VISIBLE = false;
    },
  });
}

let IA_ESCRIBIENDO = false;
let ultimoMensaje = 0;

async function enviarMensajeIA() {
  const ahora = Date.now();
  const input = document.getElementById("ia-input");
  const mensajes = document.getElementById("ia-mensajes");

  if (ahora - ultimoMensaje < 4000) {
    input.placeholder = "⚠️ Espera un momento..."; // ✅ aviso sin ensuciar el chat
    setTimeout(() => (input.placeholder = "Escribe tu pregunta..."), 2000);
    return;
  }

  ultimoMensaje = ahora;
  if (IA_ESCRIBIENDO) return;

  const texto = input.value.trim();
  if (!texto) return;

  // Mensaje del usuario
  const msgUsuario = document.createElement("div");
  msgUsuario.className = "msg-usuario";
  msgUsuario.textContent = texto;
  msgUsuario.style.opacity = 0;
  mensajes.appendChild(msgUsuario);
  anime({
    targets: msgUsuario,
    opacity: [0, 1],
    duration: 300,
    easing: "easeInOutExpo",
  });

  input.value = "";
  mensajes.scrollTop = mensajes.scrollHeight;

  // Mensaje de carga
  const msgCargando = document.createElement("div");
  msgCargando.className = "msg-ia";
  msgCargando.textContent = "Escribiendo...";
  msgCargando.style.opacity = 0;
  IA_ESCRIBIENDO = true;
  mensajes.appendChild(msgCargando);
  anime({
    targets: msgCargando,
    opacity: [0, 1],
    duration: 300,
    easing: "easeInOutExpo",
  });

  // Respuesta de la IA
  const respuesta = await sendMessageIA(texto);
  msgCargando.innerHTML = respuesta;
  mensajes.scrollTop = mensajes.scrollHeight;
  IA_ESCRIBIENDO = false;
}

document.getElementById("ia-input").addEventListener("keydown", (e) => {
  if (e.key === "Enter") enviarMensajeIA();
});
