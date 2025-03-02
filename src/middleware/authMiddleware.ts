import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface MyRequest extends Request {
  user?: { id: number; username: string };
}

interface JwtPayload {
  userId: number;
  username: string;
}

export const authMiddleware = (
  req: MyRequest,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    res
      .status(401)
      .json({ status: "0", message: "No token provided", payload: [] });
  } else {
    try {
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET as string
      ) as JwtPayload;
      req.user = { id: decoded.userId, username: decoded.username };
      next(); // This should be called to continue the middleware chain
    } catch (error) {
      console.error("JWT Verification Error:", error);
      res
        .status(403)
        .json({ status: "0", message: "Invalid token", payload: [] });
    }
  }
};
