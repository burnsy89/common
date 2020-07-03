import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface UserPayload {
  id: string;
  email: string;
}

//We need to tell TS that the Request definition can have a currentUser property optionally defined
declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPayload;
    }
  }
}

export const currentUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.session?.jwt) {
    //The ? first checks to see if the req.session is defined
    return next();
  }

  try {
    const payload = jwt.verify(
      //the JWT payload will have an id and an email. We need to tell TS this.
      req.session.jwt,
      process.env.JWT_KEY!
    ) as UserPayload;
    req.currentUser = payload;
  } catch (err) {
    //Always want to continue to next middleware
    //No need to add next()
  }

  next();
};
