const input = document.querySelector(".input-bar input");
const sendBtn = document.querySelector(".input-bar button");
const chatWindow = document.querySelector(".chat-window");
const uploadBtn = document.querySelector(".upload-btn");

let selectedImage = null;

/* Handle image selection */
uploadBtn.addEventListener("click", () => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*";

    fileInput.onchange = () => {
        selectedImage = fileInput.files[0];
        alert("Image selected ✔");
    };

    fileInput.click();
});

/* Send message */
sendBtn.addEventListener("click", sendMessage);

input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") sendMessage();
});

function addMessage(text, sender) {
    const bubble = document.createElement("div");
    bubble.className = `bubble ${sender}`;
    bubble.innerText = text;
    chatWindow.appendChild(bubble);
    chatWindow.scrollTop = chatWindow.scrollHeight;
}

async function sendMessage() {
    const text = input.value.trim();
    if (!text && !selectedImage) return;

    if (text) addMessage(text, "user");
    input.value = "";

    const formData = new FormData();
    formData.append("text", text || "Analyze this image");

    if (selectedImage) {
        formData.append("image", selectedImage);
        selectedImage = null;
    }

    try {
        const response = await fetch("https://sports-bot-backend.onrender.com/chat", {
            method: "POST",
            body: formData
        });

        const data = await response.json();
        addMessage(data.reply, "bot");

    } catch (err) {
        addMessage("⚠ Server error. Is backend running?", "bot");
    }
}
