import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { CustomRequest } from '../types/CustomRequest';


class AuthenticateMiddleware{
    private readonly accessTokenSecret = process.env.ACCESS_TOKEN_SECRET
    generateAccessToken = (user: JwtPayload | any) => {
        if (!this.accessTokenSecret) return "";
        return jwt.sign(user, this.accessTokenSecret, { expiresIn: '15m' });
      };

      authenticateToken = (req: CustomRequest, res: Response, next: NextFunction) => {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
      
        if (!process.env.ACCESS_TOKEN_SECRET) {
          res.status(500).json({ success: false, message: "Server error: Token secret is not defined" });
          return;
        }
      
        if (token == null) {
          res.status(401).json({ success: false, message: "Please provide token" });
          return;
        }
      
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
          if (err) {
            res.status(403).json({ success: false, message: "Invalid token" });
            return;
          }
      
          req.user = user as JwtPayload;
          next();
        });
      };
}

export const authenticateMiddleware = new AuthenticateMiddleware()
