const express = require("express");
const cors = require("cors");

const notFoundHandler = require("./src/middleware/notFound.middleware");
const errorHandler = require("./src/middleware/error.middleware");

const app = express();
const authRouter = require("./src/routes/auth.routes")

// Global middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API routes will be registered here later
app.use("/auth", authRouter);

// Must remain after all routes
app.use(notFoundHandler);

// Global error handler must be last
app.use(errorHandler);

module.exports = app;