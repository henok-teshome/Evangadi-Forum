const { v4: uuidv4 } = require("uuid");
const { StatusCodes } = require("http-status-codes");
const dbConnection = require("../db/dbConfig");

// Post Answer
async function postanswer(req, res) {
    try {
        const { answer } = req.body;
        const questionId = req.params.questionId;
        const userId = req.user.userid;

        if (!answer) {
            return res
                .status(StatusCodes.BAD_REQUEST)
                .json({ msg: "Please provide an answer." });
        }

        await dbConnection.query(
            "INSERT INTO answers (answer, questionid, userid) VALUES (?, ?, ?)",
            [answer, questionId, userId]
        );

        console.log("Answer posted successfully.");
        return res
            .status(StatusCodes.CREATED)
            .json({ msg: "Answer posted successfully." });
    } catch (error) {
        console.error("Error posting answer:", error.message);

        // Handle specific database error
        if (error.code === "ER_NO_REFERENCED_ROW_2") {
            return res
                .status(StatusCodes.BAD_REQUEST)
                .json({ msg: "Invalid question ID." });
        }

        return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ msg: "Something went wrong, try again later!" });
    }
}

// Get all answers for a specific question
async function allanswer(req, res) {
    try {
        const questionId = req.params.questionId;

        // Fetch all answers for the specified question
        const [answer] = await dbConnection.query(
            "SELECT answer, username FROM answers JOIN users ON answers.userid = users.userid WHERE questionid = ? ",
            [questionId]
        );

        // Respond with the fetched answers
        return res.status(StatusCodes.OK).json({ answer });
    } catch (error) {
        console.error("Error fetching answers:", error.message);
        return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ msg: "Something went wrong, try again later!" });
    }
}
module.exports = { postanswer, allanswer };
