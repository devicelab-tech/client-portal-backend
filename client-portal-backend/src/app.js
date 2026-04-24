const express = require("express");
const cors = require("cors");
const morgan = require("morgan")
const authRoutes = require("./routes/auth.routes");
const projectRoutes = require("./routes/project.routes");


const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);

app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Client Portal API is running"
    });
});


app.get("/api", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Welcome to the Client Portal API"
    });
});


//404 handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found"
    });
});

//global error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: "Internal server error"
    });
});

module.exports = app;