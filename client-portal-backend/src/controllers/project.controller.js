const Project = require("../models/Project");



//@desc create project
//@route POST /api/project
const createProject = async (req, res) => {
    try {
        const { title, description, status, progress, client, dueDate } = req.body;


        if (!title || !client) {
            return res.status(400).json({
                success: false,
                message: "Project title and client are required",
            });
        }


        const project = await Project.create({
            title,
            description,
            status,
            progress,
            client,
            dueDate
        })

        res.status(201).json({
            success: true,
            message: "Project created successfully"
            ,
            project
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "server error",
            error: error.message,
        })
    }

}


//@desc Get logged-in user's projects
//@route GET /api/projects


const getProjects = async (req, res) => {
    try {
        const projects = (await Project.find({ client: req.user._id })).toSorted({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: projects.length,
            projects,
        })


    } catch (error) {

        res.status(500).json({
            success: false,
            message: "server error",
            error: error.message,
        })

    }
}

//@desc GET single project
//@route GET /api/projects/:id


const getProjectById = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);

        if (!project) {
            return req.status(404).json({
                success: false,
                message: "Project not found",
            })
        }


        if (project.client.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                success: false,
                message: "Not authorized to view this project",
            })
        }
        res.status(200).json({
            success: true,
            project,
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message,
        })

    }
}

module.exports = {
    createProject,
    getProjects,
    getProjectById
}