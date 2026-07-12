const { getAIResponse } = require("../services/openaiService");

const chatWithAI = async (req, res) => {
    try {

        console.log("Request Body:", req.body);

        if (!req.body) {
            return res.status(400).json({
                success: false,
                message: "Request body is missing."
            });
        }

        const { message } = req.body;

        if (!message || message.trim() === "") {
            return res.status(400).json({
                success: false,
                message: "Message is required."
            });
        }

        // Create session chat history
        if (!req.session.chatHistory) {
            req.session.chatHistory = [];
        }

        const chatHistory = req.session.chatHistory;

        // AI Response
        const reply = await getAIResponse(message, chatHistory);

        // Save conversation
        chatHistory.push({
            role: "user",
            content: message
        });

        chatHistory.push({
            role: "assistant",
            content: reply
        });

        // Keep only last 20 conversation messages
        if (chatHistory.length > 20) {
            chatHistory.splice(0, chatHistory.length - 20);
        }

        return res.status(200).json({
            success: true,
            reply
        });

    } catch (error) {

        console.error("AI Controller Error:");
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Something went wrong. Please try again."
        });

    }
};

module.exports = {
    chatWithAI
};