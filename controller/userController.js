const bcrypt = require("bcrypt");
// to access HTTP status codes.
const { StatusCodes } = require("http-status-codes");
//jwt
const jwt = require("jsonwebtoken");
// db connection
const dbConnection = require("../db/dbConfig");

async function register(req, res) {
    const { username, firstname, lastname, email, password } = req.body;

    // Validate user data
    if (!username || !firstname || !lastname || !email || !password) {
        console.log("Invalid user data. Please provide all required fields.");
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json({ msg: "Please provide all required fields." });
    }

    try {
        const [user] = await dbConnection.query(
            "SELECT username, userid FROM users WHERE username=? OR email=?",
            [username, email]
        );

        if (user.length > 0) {
            // User already exists, handle accordingly
            console.log(
                "User with the provided username or email already exists."
            );
            return res
                .status(StatusCodes.BAD_REQUEST)
                .json({ msg: "User already exists." });
        }
        // Check password length
        const MIN_PASSWORD_LENGTH = 8; // Set your minimum password length requirement
        if (password.length < MIN_PASSWORD_LENGTH) {
            console.log(
                "Password is too short. Minimum length should be at least 8 characters."
            );
            return res.status(StatusCodes.BAD_REQUEST).json({
                msg: "Password should be at least 8 characters long.",
            });
        }
        // Hash the password before saving it to the database
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        await dbConnection.query(
            "INSERT INTO users (username, firstname, lastname, email, password) VALUES (?, ?, ?, ?, ?)",
            [username, firstname, lastname, email, hashedPassword]
        );

        // console.log("User created successfully.");
        return res
            .status(StatusCodes.CREATED)
            .json({ msg: "User created successfully." });
    } catch (error) {
        //console.error("Error during user registration:", error.message);
        return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ msg: "Something went wrong, try again later!" });
    }
}

async function login(req, res) {
    const { email, password } = req.body;
    // Validate user data
    if (!email || !password) {
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json({ msg: "Please provide email and password.." });
    }

    try {
        const [user] = await dbConnection.query(
            "SELECT username, userid,password From users WHERE email=?",
            [email]
        );
        if (user.length === 0) {
            console.log("User not found.");
            return res
                .status(StatusCodes.BAD_REQUEST)
                .json({ msg: "Invalid credentials." });
        }
        // Compare hashed password
        const passwordMatch = await bcrypt.compare(password, user[0].password);
        if (!passwordMatch) {
            return res
                .status(StatusCodes.BAD_REQUEST)
                .json({ msg: "Invalid credentials." });
        }
        const username = user[0].username;
        const userid = user[0].userid;
        const token = jwt.sign({ username, userid }, process.env.JWT_SECRET, {
            expiresIn: "25d",
        });
        return res.status(StatusCodes.OK).json({
            msg: "user login successful.",
            token: token,
            username: username,
        });
    } catch (error) {
        //console.error("Error during user registration:", error.message);
        return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ msg: "Something went wrong, try again later!" });
    }
}

async function checkUser(req, res) {
    const username = req.user.username;
    const userid = req.user.userid;

    res.status(StatusCodes.OK).json({ msg: "valid user", username, userid });
}

module.exports = { register, login, checkUser };
