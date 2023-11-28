import { Request, Response, NextFunction, RequestHandler } from 'express';


const errorMiddleware = (): RequestHandler => {
  return async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    next(); // TODO
  }
}

export default errorMiddleware
