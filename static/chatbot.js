document.getElementById("sendBtn").addEventListener("click", function() {
    const userInput = document.getElementById("userInput").value.trim();

    if (userInput === "") {
        alert("Please enter a message!");
        return;
    }

    fetch("/get_response", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userInput })
    })
    .then(response => response.json())
    .then(data => {
        console.log("✅ Server Response:", data); // Debugging log
        document.getElementById("chatbox").innerHTML += `
            <p><strong>You:</strong> ${userInput}</p>
            <p><strong>Bot:</strong> ${data.response}</p>
        `;
        document.getElementById("userInput").value = ""; // Clear input box
    })
    .catch(error => console.error("❌ Error:", error));
});
