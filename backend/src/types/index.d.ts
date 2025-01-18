import { Request, Response } from 'express';
import { IUser } from '../models/User';

export interface CustomRequest extends Request {
  user?: IUser;
}

export interface AuthResponse extends Response {
  locals: {
    user?: IUser;
  };
}

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}