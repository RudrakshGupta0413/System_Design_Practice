// Implementing a sliding window rate limiter
// Stores req timestamps in a Redis sorted set
// If count exceeds maxRequests, responds with 429 Too Many Requests
// Removes old timestamps outside the window
// Expires key after windowSizeInSeconds

import { Request, Response, NextFunction } from "express";
import { redisClient } from "../services/cache.service";
import { config } from "../config";

export async function rateLimiter(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const ip = req.ip;
  const now = Date.now();
  const windowSize = config.rateLimit.windowSizeInSeconds * 1000;

  const key = `rate:${ip}`;
  await redisClient.zadd(key, now, now.toString());
  await redisClient.zremrangebyscore(key, 0, now - windowSize);

  const count = await redisClient.zcard(key);

  if (count > config.rateLimit.maxRequests) {
    return res
      .status(429)
      .json({ message: "Too many requests, please try again later." });
  }

  await redisClient.expire(key, config.rateLimit.windowSizeInSeconds);
  next();
}
