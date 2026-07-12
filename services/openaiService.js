const { GoogleGenAI } = require("@google/genai");
const portfolioContext = require("./portfolioContext");

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

async function getAIResponse(userMessage, chatHistory = []) {
    try {

        let conversation = `${portfolioContext}\n\n`;

        chatHistory.forEach((chat) => {
            if (chat.role === "user") {
                conversation += `User: ${chat.content}\n`;
            } else {
                conversation += `Assistant: ${chat.content}\n`;
            }
        });

        conversation += `User: ${userMessage}\nAssistant:`;

const response = await ai.models.generateContent({
  model: "gemini-3.5-flash",
    contents: conversation,
});

        return response.text;

    } catch (error) {

        console.error("Gemini Error:", error);

        return "Sorry, I'm unable to respond right now.";

    }
}

module.exports = {
    getAIResponse,
};