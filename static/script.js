document.addEventListener("DOMContentLoaded", function () {
    const toggleSignup = document.getElementById("toggleSignup");
    const toggleLogin = document.getElementById("toggleLogin");
    const loginForm = document.getElementById("loginForm");
    const signupForm = document.getElementById("signupForm");
    const formTitle = document.getElementById("form-title");
    const emojis = document.querySelectorAll(".emoji");
    const container = document.querySelector(".container");

    toggleSignup.addEventListener("click", (event) => {
        event.preventDefault();
        loginForm.style.display = "none";
        signupForm.style.display = "block";
        formTitle.innerText = "Sign Up";
    });

    toggleLogin.addEventListener("click", (event) => {
        event.preventDefault();
        signupForm.style.display = "none";
        loginForm.style.display = "block";
        formTitle.innerText = "Login";
    });

    const moodMessages = {
        "😢": "You seem sad. Take a deep breath, and know that it's okay to feel this way.",
        "😟": "Feeling worried? Try writing down your thoughts to clear your mind.",
        "😐": "Neutral today? Maybe a short walk will refresh your mood.",
        "😊": "Glad to see you feeling good! Keep spreading positivity!",
        "😁": "You're beaming with joy! Share your happiness with someone today!"
    };

    emojis.forEach(emoji => {
        emoji.addEventListener("click", function () {
            const message = moodMessages[this.innerText];
            const messageBox = document.createElement("p");
            messageBox.innerText = message;
            messageBox.classList.add("mood-message");
            
            const existingMessage = document.querySelector(".mood-message");
            if (existingMessage) {
                existingMessage.remove();
            }

            container.appendChild(messageBox);
        });
    });
});