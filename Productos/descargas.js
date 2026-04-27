/* Lógica de descarga e identificación de SO */
const db = window.supabase.createClient(
  "https://osfygcukvzrqofllnbzf.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
);

async function sumarDescarga(id) {
  let { data } = await db // ← db en lugar de supabase
    .from("descargas")
    .select("total")
    .eq("id", id)
    .single();

  await db.rpc("incrementar_descarga", { p_id: id });

  if (!data) {
    await db.from("descargas").insert({ id, total: 1 });
    return;
  }

  await db
    .from("descargas")
    .update({ total: data.total + 1 })
    .eq("id", id);
}

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
    b.addEventListener("click", async (ev) => {
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
      await sumarDescarga("proyecto1");
    });
  });
} else {
  console.warn(
    "No se encontraron botones con la clase .btn-pro para activar descargas.",
  );
}

async function owner(o = false) {
  let owner = o;
  const pr_data =
    owner === true
      ? prompt("¿Quieres ver el núm. de descargas de cada producto? (si/no)")
      : console.log(`Owner isn't here!`);

  if (pr_data === "si") {
    async function obtenerDescargas(id) {
      let { data } = await db
        .from("descargas")
        .select("total")
        .eq("id", id)
        .single();

      return data?.total || 0;
    }
    (async () => {
      const data = await obtenerDescargas("proyecto1");
      console.log(data);
    })();
  } else if (pr_data === "no") {
    console.log("Vale.");
  } else {
    console.warn("¡Respuesta no aceptada! Vuelve a intentarlo más tarde.");
    owner();
  }
}
owner();
