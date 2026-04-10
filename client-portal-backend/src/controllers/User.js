const bcrypt = require("bcryptjs");
const User = require("../models/User");

const registerUser = async (req, res) => {
    try {
        const { fullname, email, password, companyName, phone } = req.body
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists."
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        const user = await User.create({
            fullname,
            email,
            password: hashedPassword,
            companyName,
            phone,
        })
        res.status(201).json({
            success: true,
            message: "User registered successfully",
            user,
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error",
        })

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

        res.status(200).json({
            succcess: true,
            message: "Login successful",
            user,
        })



    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error",
        })
    }
}