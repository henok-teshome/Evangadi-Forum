const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

const {
    allquestions,
    postquestions,
    singlequestions,
} = require("../controller/questionController.js");

//post question route
router.post("/post-questions", authMiddleware, postquestions);

//all question route
router.get("/all-questions", authMiddleware, allquestions);

//single question route
router.get("/question/:questionid", authMiddleware, singlequestions);

module.exports = router;
