const API_KEY = "AIzaSyCNzuX5GOs-lnMZOzTLrveqNkEZZKBc5rs"; // Reemplaza esto por tu clave API segura
const API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=" + API_KEY;

async function sendMessage() {
  const input = document.getElementById("user-input");
  const message = input.value.trim();
  if (!message) return;

  addMessage("Tú: " + message, "user");
  input.value = "";

  const body = {
    contents: [{ parts: [{ text: message }] }]
  };

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    });

    const data = await response.json();
    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || "(Sin respuesta)";
    addMessage("Gemini: " + reply, "bot");
  } catch (error) {
    addMessage("Error: No se pudo conectar con Gemini", "bot");
    console.error(error);
  }
}

function addMessage(text, type) {
  const chatBox = document.getElementById("chat-box");
  const div = document.createElement("div");
  div.className = "message " + type;
  div.textContent = text;
  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight;
}