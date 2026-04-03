const IA_KEY = "AIzaSyBBoPa5YJ2ZrdJhL4trxyCAdXgFckq6mwk";

async function sendMessageIA(mensaje) {
  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${IA_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          system_instruction: {
            parts: [
              {
                text: "Eres el asistente de soporte técnico de Alias Estudio. Responde siempre en español o inglés y de forma amable. Habla con términos que se adapten al usuario: Sencillos, técnicos... Etc.",
              },
            ],
          },
          contents: [{ parts: [{ text: mensaje }] }],
        }),
      },
    );

    const data = await response.json();

    if (!response.ok) {
      if (response.status === 429)
        return "⚠️ Demasiadas consultas seguidas. Espera unos segundos e inténtalo de nuevo.";
      return `❌ Error ${response.status}: ${data.error?.message || "Error desconocido"}`;
    }

    return data.candidates[0].content.parts[0].text;
  } catch (error) {
    return "❌ Error de conexión. Comprueba tu internet e inténtalo de nuevo.";
  }
}
