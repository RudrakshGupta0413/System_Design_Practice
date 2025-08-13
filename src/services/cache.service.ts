// Connect to Redis

import Redis from "ioredis";
import { config } from "../config";
import { logger } from "../utils/logger";

export const redisClient = new Redis(config.redisUrl);

redisClient.on("connect", () => {
  logger.info("Connected to Redis");
});

redisClient.on("error", (err) => {
  logger.error(`Redis Error: ${err}`);
});
