function addMessage(text, sender) {
    const messageDiv = document.createElement("div");
    messageDiv.className = `chat-message ${sender}`;
    messageDiv.innerText = text;
    document.getElementById("chatMessages").appendChild(messageDiv);
    document.getElementById("chatMessages").scrollTop = document.getElementById("chatMessages").scrollHeight;
}

function sendMessage() {
    const userInput = document.getElementById("userInput");
    const message = userInput.value.trim();
    if (!message) return;

    addMessage(message, "user");
    userInput.value = "";

    fetch("/get_response", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message })
    })
    .then(response => response.json())
    .then(data => {
        addMessage(data.response, "bot");
    })
    .catch(error => console.error("Error:", error));
}
