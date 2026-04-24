const express = require("express");


const {
    createProject, getproject, getProjectById,
    getProjects
} = require("../controllers/project.controller")

const { protect } = require("../middleware/auth.middleware");


const router = express.Router();

router.post("/", protect, createProject);
router.get("/", protect, getProjects);
router.get("/:id", protect, getProjectById);

module.exports = router;
