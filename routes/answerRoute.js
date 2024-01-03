const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const { v4: uuidv4, validate: isUUID } = require("uuid");
const { allanswer, postanswer } = require("../controller/answerController");

function validateUUID(req, res, next) {
    const { questionid } = req.params;
    if (!isUUID(questionid)) {
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json({ msg: "Invalid UUID format." });
    }
    next();
}

//post answer route
router.post("/post-answer/:questionId", authMiddleware, postanswer);

//all answer route (not all question)
router.get("/all-answer/:questionId", authMiddleware, allanswer);

module.exports = router;
