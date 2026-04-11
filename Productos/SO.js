/*
 * Devuelve la ruta del archivo de descarga según el identificador de SO.
 * Uso: getFileForOS("Windows") => "ZIP/Alias-Studio-Code-Windows_x64.msi"
 */
function getFileForOS(operativeSystem) {
  let file = "";

  if (operativeSystem === "Windows") {
    file = "ZIP/Alias-Studio-Code-Windows_x64.msi";
  } else if (operativeSystem === "Linux") {
    file = "ZIP/Alias-Studio-Code-Linux_x64.deb";
  } else if (operativeSystem === "MacOS") {
    file = "ZIP/Alias-Studio-Code-MacOS_x64.dmg";
  } else if (operativeSystem === "Android") {
    file = "ZIP/Alias-Studio-Code-Android_x64.apk";
  } else if (operativeSystem === "iOS") {
    file = "ZIP/Alias-Studio-Code-iOS_x64.ipa";
  } else {
    alert(
      "Sistema operativo no reconocido. Por favor, del .zip descargue el archivo correspondiente a su sistema operativo.",
    );
    file = "ZIP/Alias-Studio-Code-UnknownOS_x64.zip";
  }

  return file;
}

// Exponer como utilidad global por si otros scripts la utilizan
window.getFileForOS = getFileForOS;
