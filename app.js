require("dotenv").config();
require("dotenv").config();
const express = require("express");
const app = express();
const PORT = 7000;
const cors = require("cors");
app.use(cors());

// db connection
const dbConnection = require("./Model/dbConfig");
// json middleware to extract JSON
app.use(express.json());

// Set global Content-Type header
app.use((req, res, next) => {
    res.set("Content-Type", "application/json");
    next();
});
// user route middleware file
const userRoutes = require("./routes/userRoute");
//questions route middleware file
const questionRoutes = require("./routes/questionRoute");
const authMiddleware = require("./middleware/authMiddleware");
// use userRoutes for '/api/users' path
app.use("/api/users", userRoutes);
// use questionRoutes for '/api/users' path
app.use("/api/questions", authMiddleware, questionRoutes); // question

//Question route middleware file ???

// Answer route middleware ??
async function start() {
    try {
        const result = await dbConnection.execute("SELECT  'Abebe' ");
        //console.log(result);
        await app.listen(PORT);

        console.log("connection is established");
        console.log("Server is running...");
        console.log(`listening on ${PORT}`);
    } catch (error) {
        console.log(error.message);
    }
}
start();
