const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User.js");




const getMe = async (req, res) => {
    res.status(200).json({
        success: true,
        user: req.user,
    });
};


const generateToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
        expiresIn: '7d',
    });
};

const registerUser = async (req, res) => {
    try {
        const { fullName, email, password, companyName, phone } = req.body
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists."
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        const user = await User.create({
            fullName,
            email,
            password: hashedPassword,
            companyName,
            phone,
        });
        const token = generateToken(user._id);
        res.status(201).json({
            success: true,
            message: "User registered successfully",
            token,
            message: "dont send token!!!, only test",
            user,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: `Server error ${error}`,

        });

    };

};


const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials",
            })
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials",
            })
        }

        const token = generateToken(user._id);

        res.status(200).json({
            succcess: true,
            message: "Login successful",
            token,
            user,
            message: "dont send token!!!, only test"
        });



    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error",
        })
    }
}


module.exports = {
    registerUser,
    loginUser,
    getMe,
};