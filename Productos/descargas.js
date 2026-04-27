/* Lógica de descarga e identificación de SO */

const botones = document.querySelectorAll(".btn-pro");

function descargar(href, downloadName) {
  const link = document.createElement("a");
  link.href = href;
  link.download = downloadName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function detectOS() {
  const ua = navigator.userAgent || navigator.vendor || window.opera;
  if (/Windows NT|Win32|Win64/i.test(ua)) return "Windows";
  if (/Android/i.test(ua)) return "Android";
  if (/iPhone|iPad|iPod/i.test(ua)) return "iOS";
  if (/Mac OS X|Macintosh/i.test(ua)) return "MacOS";
  if (/Linux/i.test(ua) && !/Android/i.test(ua)) return "Linux";
  return "Unknown";
}

function fileForProductAndOS(productKey, osKey) {
  // Actualmente solo tenemos un producto: alias-studio
  if (productKey === "alias-studio") {
    switch (osKey) {
      case "Windows":
        return {
          href: "ZIP/Alias-Studio-Code-Windows_x64.msi",
          name: "Alias-Studio-Code-Windows_x64.msi",
        };
      case "Linux":
        return {
          href: "ZIP/Alias-Studio-Code-Linux_x64.deb",
          name: "Alias-Studio-Code-Linux_x64.deb",
        };
      case "MacOS":
        return {
          href: "ZIP/Alias-Studio-Code-MacOS_x64.dmg",
          name: "Alias-Studio-Code-MacOS_x64.zip",
        };
      default:
        return {
          href: "ZIP/Alias-Studio-Code-UnknownOS_x64.zip",
          name: "Alias-Studio-Code-UnknownOS_x64.zip",
        };
    }
  }

  // Producto desconocido: devolver zip genérico
  return {
    href: "ZIP/Alias-Studio-Code-UnknownOS_x64.zip",
    name: "Alias-Studio-Code-UnknownOS_x64.zip",
  };
}

if (botones && botones.length > 0) {
  botones.forEach((b) => {
    b.addEventListener("click", (ev) => {
      const productKey = b.dataset.product || "alias-studio";
      const osKey = detectOS();
      const file = fileForProductAndOS(productKey, osKey);

      if (osKey === "Unknown") {
        alert(
          "Sistema operativo no reconocido. Se descargará el paquete genérico .zip.",
        );
        alert(
          "La app no es compatible con Android ni iOS. Disculpen las molestias.",
        );
      }

      descargar(file.href, file.name);

      // 🔥 SUMAR DESCARGA
      fetch(
        "https://alias-estudio-backend-code.onrender.com/descargar/proyecto1",
        {
          method: "POST",
        },
      ).catch((err) => {
        console.log(err);
      });
    });
  });
} else {
  console.warn(
    "No se encontraron botones con la clase .btn-pro para activar descargas.",
  );
}
