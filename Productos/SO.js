/*
 * Devuelve la ruta del archivo de descarga según el identificador de SO.
 * Uso: getFileForOS("Windows") => "ZIP/Alias-Studio-Code-Windows_x64.msi"
 */
function getFileForOS(operativeSystem) {
  let file = "";

  if (operativeSystem === "Windows") {
    file = "ZIP/Alias-Studio-Code-Windows_x64.exe";
  } else if (operativeSystem === "Linux") {
    file = "ZIP/Alias-Studio-Code-Linux_x64.zip";
  } else if (operativeSystem === "MacOS") {
    file = "ZIP/Alias-Studio-Code-MacOS_x64.zip";
  } else {
    alert(
      "Sistema operativo no reconocido o no compatible.",
    );

  }

  return file;
}

// Exponer como utilidad global por si otros scripts la utilizan
window.getFileForOS = getFileForOS;
