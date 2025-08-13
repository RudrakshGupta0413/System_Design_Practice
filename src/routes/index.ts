// Connect routes to controllers & middleware

import { Router } from "express";
import { homeController } from "../controllers/main.controller";
import { rateLimiter } from "../middleware/rateLimiter";

const router = Router();

router.get("/", rateLimiter, homeController);

export default router;
// This sets up the main route with rate limiting applied