import { Injectable, NestMiddleware } from '@nestjs/common';
import type { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // any logic
    console.log(`[Request logger]: Incoming request to ${req.originalUrl}`);

    next();
  }
}

// export const loggerMiddleware = (
//   req: Request,
//   res: Response,
//   next: NextFunction,
// ) => {
//   // any logic
//   console.log('function Logger middleware....');
//   next();
// };
