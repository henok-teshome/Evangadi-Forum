const express = require("express");
const router = express.Router();
//authentication middleware
const authMiddleware = require("../middleware/authMiddleware");

// user controller
const { register, login, checkUser } = require("../controller/userController");
router.post("/register", register);

// Login router route
router.post("/login", login);

// check user route
router.get("/check", authMiddleware, checkUser);

module.exports = router;
