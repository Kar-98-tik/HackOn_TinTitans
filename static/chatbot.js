document.addEventListener("DOMContentLoaded", function () {
    const chatBox = document.getElementById("chatBox");
    const userInput = document.getElementById("userInput");
    const sendBtn = document.getElementById("sendBtn");

    function addMessage(sender, text) {
        const msgDiv = document.createElement("div");
        msgDiv.classList.add(sender === "user" ? "user-message" : "bot-message");
        msgDiv.textContent = text;
        chatBox.appendChild(msgDiv);
        chatBox.scrollTop = chatBox.scrollHeight;
    }

    async function sendMessage() {
        const message = userInput.value.trim();
        if (!message) return;

        addMessage("user", message);
        userInput.value = "";

        const response = await fetch("/get_response", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message })
        });

        const data = await response.json();
        addMessage("bot", data.response);
    }

    sendBtn.addEventListener("click", sendMessage);
    userInput.addEventListener("keypress", e => { if (e.key === "Enter") sendMessage(); });
});
document.getElementById("sendBtn").addEventListener("click", function() {
    const userInput = document.getElementById("userInput").value;

    fetch("/get_response", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userInput })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById("chatbox").innerHTML += `
            <p><strong>You:</strong> ${userInput}</p>
            <p><strong>Bot:</strong> ${data.response}</p>
        `;
    })
    .catch(error => console.error("Error:", error));
});
