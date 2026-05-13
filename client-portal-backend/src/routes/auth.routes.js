const express = require("express");

const { registerUser, loginUser, getMe } = require("../controllers/auth.controller");
const { protect } = require("../middleware/auth.middleware");
const { getUsers } = require("../controllers/user.controller");

const router = express.Router();
router.post('/register', registerUser);
router.post('/login', loginUser);

module.exports = router;