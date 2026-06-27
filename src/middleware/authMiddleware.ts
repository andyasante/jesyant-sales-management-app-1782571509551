import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/User';

interface AuthRequest extends Request {
  user?: User;
}

const authMiddleware = (roles: string[] = []) => {
  return async (req: AuthRequest, res: Response, next: NextFunction) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string; role: string };
      const user = await User.findById(decoded.id);
      if (!user) {
        return res.status(401).json({ message: 'Invalid token.' });
      }

      req.user = user;

      if (roles.length && !roles.includes(user.role)) {
        return res.status(403).json({ message: 'Access denied. Insufficient permissions.' });
      }

      next();
    } catch (error) {
      return res.status(400).json({ message: 'Invalid token.' });
    }
  };
};

export default authMiddleware;