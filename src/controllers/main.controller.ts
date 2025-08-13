// Handles the incoming request and returns a response

import { Request, Response } from "express";

export const homeController = (req: Request, res: Response) => {
  res.status(200).json({
    message: "Hello! You are within the limit.",
  });
};
