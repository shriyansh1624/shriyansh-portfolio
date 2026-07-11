const axios = require("axios");

const sendTelegramMessage = async (contact) => {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!botToken || !chatId) {
    console.warn(
      "⚠️ Telegram notification skipped: token or chat ID is missing."
    );
    return false;
  }

  const submittedAt = new Date(contact.createdAt || Date.now())
    .toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      dateStyle: "medium",
      timeStyle: "short"
    });

  const notification = [
    "🚨 NEW PORTFOLIO ENQUIRY",
    "",
    `👤 Name: ${contact.name}`,
    `📧 Email: ${contact.email}`,
    `📱 Phone: ${contact.phone || "Not provided"}`,
    `📝 Subject: ${contact.subject || "Portfolio Enquiry"}`,
    "",
    "💬 Message:",
    contact.message,
    "",
    "━━━━━━━━━━━━━━━━━━━━",
    `🕒 ${submittedAt}`,
    "🌐 Shriyansh Portfolio"
  ].join("\n");

  try {
    const telegramUrl =
      `https://api.telegram.org/bot${botToken}/sendMessage`;

    await axios.post(
      telegramUrl,
      {
        chat_id: chatId,
        text: notification,
        disable_web_page_preview: true
      },
      {
        timeout: 8000
      }
    );

    console.log("✅ Telegram notification sent");
    return true;
  } catch (error) {
    console.error(
      "❌ Telegram notification error:",
      error.response?.data || error.message
    );

    return false;
  }
};

module.exports = sendTelegramMessage;