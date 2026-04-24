const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Project title is required"],
        trim: true,

    },
    description: {
        type: String,
        default: "",
        trim: true,

    },
    status: {
        type: String,
        enum: ["pending", "in-progress", "completed", "on-hold"],
        default: "pending",
    },
    progress: {
        type: Number,
        default: 0,
        min: 0,
        max: 100,
    },
    client: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,

    },
    dueDate: {
        type: Date,
    },

}, {
    timestamps: true
})

module.exports = mongoose.model("Project", projectSchema);