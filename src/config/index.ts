// Central place to load environment variables and configuration settings

import dotenv from "dotenv";

dotenv.config();

export const config = {
  port: process.env.PORT || 3000,
  redisUrl: process.env.REDIS_URL || "redis://localhost:6379",
  rateLimit: {
    windowSizeInSeconds: 60,
    maxRequests: 5,
  },
};
