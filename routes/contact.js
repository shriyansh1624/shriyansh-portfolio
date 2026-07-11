const express = require("express");
const rateLimit = require("express-rate-limit");
const { body } = require("express-validator");
const { submitContact } = require("../controllers/contactController");

const router = express.Router();

/*
 * Maximum 5 submissions from one IP in 15 minutes.
 */
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  standardHeaders: true,
  legacyHeaders: false,

  handler: (req, res) => {
    return res.redirect(
      "/?error=Too%20many%20messages.%20Please%20try%20again%20after%2015%20minutes.#contact"
    );
  }
});

const contactValidation = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required.")
    .bail()
    .isLength({ min: 2, max: 50 })
    .withMessage("Name must contain 2 to 50 characters.")
    .bail()
    .matches(/^[\p{L}\s.'-]+$/u)
    .withMessage("Name contains invalid characters."),

  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required.")
    .bail()
    .isEmail()
    .withMessage("Enter a valid email address.")
    .bail()
    .normalizeEmail()
    .isLength({ max: 120 })
    .withMessage("Email address is too long."),

  body("phone")
    .optional({ checkFalsy: true })
    .trim()
    .customSanitizer((value) => value.replace(/[\s()-]/g, ""))
    .isMobilePhone("en-IN")
    .withMessage("Enter a valid Indian mobile number."),

  body("subject")
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ min: 3, max: 100 })
    .withMessage("Subject must contain 3 to 100 characters."),

  body("message")
    .trim()
    .notEmpty()
    .withMessage("Message is required.")
    .bail()
    .isLength({ min: 10, max: 1000 })
    .withMessage("Message must contain 10 to 1000 characters."),

  /*
   * Invisible honeypot input.
   */
  body("website")
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ max: 200 })
];

router.post("/", contactLimiter, contactValidation, submitContact);

module.exports = router;