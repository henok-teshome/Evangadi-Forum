const { v4: uuidv4 } = require("uuid");
const { StatusCodes } = require("http-status-codes");
const dbConnection = require("../db/dbConfig");

// post Questions
async function postquestions(req, res) {
    const { title, description, tag } = req.body;
    console.log("req.user:", req.user);

    // Validate question data
    if (!title || !description) {
        console.log(
            "Invalid question data. Please provide all required fields."
        );
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json({ msg: "Please provide all required fields." });
    }

    // Assuming you have the user ID available in the request (you may need to modify this based on your setup)
    // Extract userid from req.user
    const userId = req.user.userid; // Replace 'id' with the actual field name in your user object

    try {
        // Generate a unique questionId using uuid
        const questionId = uuidv4();

        // Insert the question into the 'questions' table
        await dbConnection.query(
            "INSERT INTO questions (questionid, title, description, tag, userid) VALUES (?, ?, ?, ?, ?)",
            [questionId, title, description, tag, userId]
        );

        console.log("Question posted successfully.");
        return res
            .status(StatusCodes.CREATED)
            .json({ msg: "Question posted successfully." });
    } catch (error) {
        console.error("Error posting question:", error.message);
        return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ msg: "Something went wrong, try again later!" });
    }
}

// get all questions

async function allquestions(req, res) {
    try {
        // Retrieve questions with associated user information
        const [allquestion] = await dbConnection.query(
            "SELECT q.title, q.description, q.questionid, q.tag, u.username FROM questions q JOIN users u ON q.userid = u.userid ORDER BY id DESC"
        );

        // Send the result as JSON
        return res.status(StatusCodes.OK).json({ allquestion });
    } catch (error) {
        console.error("Error retrieving questions:", error.message);
        return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ msg: "Something went wrong, try again later!" });
    }
}

// Retrieve a single question
async function singlequestions(req, res) {
    const questionid = req.params.questionid;

    try {
        const query = "SELECT * FROM questions WHERE questionid = ?";
        const [question] = await dbConnection.query(query, [questionid]);

        if (!question.length) {
            return res
                .status(StatusCodes.NOT_FOUND)
                .json({ msg: "Question not found." });
        }

        return res.status(StatusCodes.OK).json(question[0]);
    } catch (error) {
        console.log("Error retrieving question:", error);
        return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ msg: "Something went wrong, try again later!" });
    }
}

module.exports = { postquestions, allquestions, singlequestions };
