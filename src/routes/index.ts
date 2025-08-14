// Connect routes to controllers & middleware

import { Router } from "express";
import { homeController } from "../controllers/main.controller";
import { rateLimiter } from "../middleware/rateLimiter";
import { cacheMiddleware } from "../middleware/cacheMiddleware";
import { getDataController } from "../controllers/data.Controller";

const router = Router();

router.get("/", rateLimiter, homeController);
router.get("/data", cacheMiddleware, getDataController);

export default router;
// This sets up the main route with rate limiting applied