import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config';
import User, { IUser } from '../models/User';

export interface AuthRequest extends Request {
  user?: IUser;
  userId?: string;
}

export const auth = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Authorization required' });
    }

    const token = authHeader.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ message: 'Token not found' });
    }

    try {
      const decoded = jwt.verify(token, config.jwtSecret) as { id: string };
      const user = await User.findById(decoded.id).select('-password') as IUser;

      if (!user) {
        return res.status(401).json({ message: 'User not found' });
      }

      req.user = user;
      req.userId = user._id.toString();
      return next();
    } catch (error) {
      return res.status(401).json({ message: 'Invalid token' });
    }
  } catch (error) {
    return res.status(500).json({ message: 'Server error' });
  }
};