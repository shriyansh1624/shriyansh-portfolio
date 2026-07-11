const { validationResult, matchedData } = require("express-validator");
const Contact = require("../models/Contact");
const sendTelegramMessage = require("../config/telegram");

/**
 * Save a validated contact enquiry.
 * After successful save, trigger Telegram notification
 * and redirect with success=1 for the terminal animation.
 */
exports.submitContact = async (req, res) => {
  try {
    const errors = validationResult(req);

    // Validation failed
    if (!errors.isEmpty()) {
      const firstError =
        errors.array({ onlyFirstError: true })[0]?.msg ||
        "Please check the entered information.";

      return res.redirect(
        `/?error=${encodeURIComponent(firstError)}#contact`
      );
    }

    // Only validated and declared fields
    const validatedData = matchedData(req, {
      locations: ["body"],
      includeOptionals: true
    });

    // Honeypot spam detection
    if (validatedData.website) {
      console.warn("⚠️ Spam submission blocked by honeypot.");

      // Fake success response so spam bots cannot detect blocking
      return res.redirect("/?success=1#contact");
    }

    const {
      name,
      email,
      phone = "",
      subject = "Portfolio Enquiry",
      message
    } = validatedData;

    // Save enquiry in MongoDB
    const contact = await Contact.create({
      name,
      email,
      phone,
      subject: subject || "Portfolio Enquiry",
      message,
      status: "new"
    });

    console.log(`✅ Contact saved in MongoDB: ${contact._id}`);

    /*
     * Telegram notification is secondary.
     * If Telegram fails, database submission should remain successful.
     */
    try {
      const telegramSent = await sendTelegramMessage(contact);

      if (telegramSent) {
        console.log("✅ Telegram notification sent successfully");
      } else {
        console.warn("⚠️ Telegram notification was not sent");
      }
    } catch (telegramError) {
      console.error(
        "❌ Telegram notification failed:",
        telegramError.response?.data || telegramError.message
      );
    }

    // success=1 opens the cinematic success terminal
    return res.redirect("/?success=1#contact");
  } catch (error) {
    console.error(
      "❌ Contact submission error:",
      error.message
    );

    if (error.name === "ValidationError") {
      return res.redirect(
        "/?error=Invalid%20contact%20information.#contact"
      );
    }

    return res.redirect(
      "/?error=Unable%20to%20send%20your%20message.%20Please%20try%20again.#contact"
    );
  }
};