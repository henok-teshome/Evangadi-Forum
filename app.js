require("dotenv").config();
const express = require("express");
const app = express();
const PORT = 7000;
const cors = require("cors");
const dbConnection = require("./db/dbConfig");

// Middleware to set global Content-Type header
app.use((req, res, next) => {
    res.set("Content-Type", "application/json");
    next();
});

// Middleware for JSON extraction
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Middleware for enabling CORS
app.use(cors());

// Routes
const userRoutes = require("./routes/userRoute");
const questionRoutes = require("./routes/questionRoute");
const answerRoutes = require("./routes/answerRoute");
const authMiddleware = require("./middleware/authMiddleware");

// Use userRoutes for '/api/users' path
app.use("/api/users", userRoutes);

// Use questionRoutes for '/api/questions' path
app.use("/api/questions", questionRoutes);

// Use answerRoutes for '/api/answers' path
app.use("/api/answers", answerRoutes);

// Start server
async function start() {
    try {
        // Check the database connection
        await dbConnection.execute("SELECT  'Abebe' ");
        console.log("Database connection established");

        // Start the server
        await app.listen(PORT);
        console.log("Server is running...");
        console.log(`Listening on ${PORT}`);
    } catch (error) {
        console.error("Error during startup:", error.message);
    }
}

// Start the application
start();
