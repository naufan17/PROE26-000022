import { Request, Response, NextFunction } from 'express';
import passport from 'passport';

export const authorizeBearer = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate('jwt', { session: false }, (err: any, user: any, info: any) => {
    if (err || !user) {
      return res.status(401).json({ message: info ? info.message : 'Unauthorized' });
    }
    req.user = user;
    next();
  })(req, res, next);
}