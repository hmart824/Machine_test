import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";


const secretKey = process.env.JWT_SECRET_KEY as string;


export const authCheck = async(req: Request, res: Response, next: NextFunction):Promise<void> => {
    const token = req.headers['authorization'];
    if (!token) {
      res.status(401).json({ error: "No token provided" });
      return
    }
  
    const tokenWithoutBearer = token.split(" ")[1];
  
    try {
      const decoded = ( jwt.verify(
        tokenWithoutBearer,
        secretKey as string
      )) as JwtPayload;
  
      if (!decoded) {
         res.status(401).json({ error: "Invalid token" });
         return
      }

     
      next();
    } catch (error: any) {
      console.log("error in token verification", error);
      if (error.name === "TokenExpiredError") {
         res.status(401).json({ error: "Token has expired" });
         return
      }
       res.status(401).json({ error: "Token verification failed" });
       return
    }
  };

