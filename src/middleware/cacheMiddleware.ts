// Uses LRU Cache to store and retrieve API results

import { Request, Response, NextFunction } from 'express';
import { lruCacheInstance } from '../services/lruCache.service';

export function cacheMiddleware(req: Request, res: Response, next: NextFunction) {
    const key = req.originalUrl;
    const cachedData = lruCacheInstance.get(key);

    if (cachedData) {
        return res.json({source: 'cache', data: cachedData});
    }

    res.locals.cacheKey = key;
    next();
}