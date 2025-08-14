// Simulates a db call and stores the result in cache

import { Request, Response, NextFunction } from 'express';
import { lruCacheInstance } from '../services/lruCache.service';

export async function getDataController(req: Request, res: Response, next: NextFunction) {

    //  Simulate slow DB call
    const fakeDbData = { time: new Date().toISOString(), value: Math.random() };
    await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate a 2 seconds delay

    // Store the result in cache
    lruCacheInstance.put(req.originalUrl, fakeDbData);

    res.json({ source: 'db', data: fakeDbData });
}