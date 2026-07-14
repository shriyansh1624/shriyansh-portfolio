const express = require("express");
const router = express.Router();

const { chatWithAI } = require("../controllers/aiController");

router.use((req, res, next) => {
    console.log("AI Route Hit:", req.method, req.originalUrl);
    next();
});

router.post("/chat", chatWithAI);

module.exports = router;