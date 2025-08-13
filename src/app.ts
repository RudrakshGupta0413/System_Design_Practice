// Sets up the express application

import express from "express";
import router from "./routes";
import { errorHandler } from "./utils/errorHandler";

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Use the routes defined in the router
app.use("/", router);

// Centralized error handling middleware
app.use(errorHandler);

export default app;