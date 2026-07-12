// ==========================
// SHRIYANSH AI CHATBOT
// ==========================

const chatbot = document.getElementById("chatbot");
const chatToggle = document.getElementById("chatToggle");
const closeChat = document.getElementById("closeChat");
const chatBody = document.getElementById("chatBody");
const chatInput = document.getElementById("chatInput");
const sendChat = document.getElementById("sendChat");
const typing = document.getElementById("typing");

// ==========================
// Open / Close Chat
// ==========================

chatToggle.addEventListener("click", () => {
    chatbot.classList.add("open");
    chatInput.focus();
});

closeChat.addEventListener("click", () => {
    chatbot.classList.remove("open");
});

// ==========================
// Scroll
// ==========================

function scrollBottom() {
    chatBody.scrollTop = chatBody.scrollHeight;
}

// ==========================
// Add Message
// ==========================

function addMessage(message, sender = "bot") {

    const div = document.createElement("div");

    div.className =
        sender === "user"
            ? "user-message"
            : "bot-message";

    div.innerHTML = `<p>${message}</p>`;

    chatBody.appendChild(div);

    scrollBottom();
}

// ==========================
// Typing
// ==========================

function showTyping() {
    typing.style.display = "flex";
    scrollBottom();
}

function hideTyping() {
    typing.style.display = "none";
}

// ==========================
// Send Message
// ==========================

async function sendMessage(message) {

    if (!message || !message.trim()) return;

    addMessage(message, "user");

    chatInput.value = "";

    sendChat.disabled = true;

    showTyping();

    try {

        const response = await fetch("/api/chat", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                message: message
            })

        });

        const data = await response.json();

        hideTyping();

        if (response.ok && data.success) {

            addMessage(data.reply, "bot");

        } else {

            addMessage(
                data.message || "Something went wrong.",
                "bot"
            );

        }

    } catch (error) {

        console.error(error);

        hideTyping();

        addMessage(
            "Unable to connect to AI server.",
            "bot"
        );

    } finally {

        sendChat.disabled = false;

        chatInput.focus();

    }

}

// ==========================
// Send Button
// ==========================

sendChat.addEventListener("click", () => {

    sendMessage(chatInput.value);

});

// ==========================
// Enter Key
// ==========================

chatInput.addEventListener("keydown", (e) => {

    if (e.key === "Enter") {

        e.preventDefault();

        sendMessage(chatInput.value);

    }

});

// ==========================
// Quick Buttons
// ==========================

const prompts = {

    about: "Tell me about Shriyansh.",

    skills: "What technical skills does Shriyansh have?",

    projects: "Show Shriyansh's projects.",

    experience: "Tell me about Shriyansh's experience.",

    certifications: "Show Shriyansh's certifications.",

    resume: "Summarize Shriyansh's resume.",

    contact: "How can I contact Shriyansh?"

};

document.querySelectorAll(".quick-buttons button").forEach((button) => {

    button.addEventListener("click", () => {

        const action = button.dataset.action;

        if (prompts[action]) {

            sendMessage(prompts[action]);

        }

    });

});

// ==========================
// Welcome
// ==========================

window.addEventListener("load", () => {

    setTimeout(() => {

        addMessage(
            "👋 Welcome! I'm Shriyansh AI. Ask me anything about Shriyansh's skills, projects, experience, certifications or resume."
        );

    }, 500);

});