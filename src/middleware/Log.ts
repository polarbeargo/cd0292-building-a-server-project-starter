import { Request, Response, NextFunction } from 'express';
// createlogger middleware function
function logger(req: Request, res: Response, next: NextFunction) {
  console.log(`Request URL: ${req.url}`);
  next();
}

export default logger;