document.addEventListener("DOMContentLoaded", function () {
    const emojis = document.querySelectorAll(".emoji");
    const container = document.querySelector(".container");

    const moodMessages = {
        "😢": "You seem sad. Let’s chat and help you feel better. 💙",
        "😟": "Worried? Let’s talk it out together. 🤗",
        "😐": "Feeling neutral? Maybe a chat can refresh you! 🌤️",
        "😊": "Happy vibes! Let’s keep that positivity flowing! 😄",
        "😁": "So much joy! Let’s celebrate it together! 🎉"
    };

    emojis.forEach(emoji => {
        emoji.addEventListener("click", async function () {
            const mood = this.innerText;
            await fetch("/set_mood", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ mood })
            });

            container.innerHTML = `<h2>${mood}</h2><p>${moodMessages[mood]}</p>`;
            setTimeout(() => window.location.href = "/chatbot", 2000);
        });
    });
});
