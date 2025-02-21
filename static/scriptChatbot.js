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

    setTimeout(() => {
        const botResponse = "Thanks for sharing! How else can I assist you?";
        addMessage(botResponse, "bot");
    }, 800);
}
