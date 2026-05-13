const User = require("../models/User");

const getUsers = async (req, res) => {
    try {

        if (req.user.role !== "admin") {
            return res.status(403).json({
                success: false,
                message: "Not authorized as admin",
            })

        }
        const users = await User.find({ role: "client" }).select("-password");

        res.status(200).json({
            success: true,
            users,
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

module.exports = {
    getUsers,
}