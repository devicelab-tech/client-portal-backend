const express = require("express");


const {
    createProject, deleteProject, updateProject, getProjectById,
    getProjects
} = require("../controllers/project.controller")

const { protect } = require("../middleware/auth.middleware");


const router = express.Router();

router.post("/", protect, createProject);
router.delete("/delete/:id", protect, deleteProject);
router.put("/update/:id", protect, updateProject);
router.get("/", protect, getProjects);
router.get("/:id", protect, getProjectById);

module.exports = router;
