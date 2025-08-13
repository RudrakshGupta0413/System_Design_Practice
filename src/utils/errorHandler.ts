// Centralized error handling utility for Node.js applications
// Any thrown error in routes/middleware will come here.
// Logs error + sends JSON error response.

import { Request, Response, NextFunction } from "express";
import { logger } from "./logger";

export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
  
) {
  logger.error(err.message || "Server Error");
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
}
