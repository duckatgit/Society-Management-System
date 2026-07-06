import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const protect = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  let token;

  const authHeader = req.headers.authorization;

  if (
    authHeader &&
    (authHeader.startsWith("Bearer") || authHeader.startsWith("bearer"))
  ) {
    try {
      // Split by space and grab the token part safely
      token = authHeader.split(" ")[1];

      if (!token) {
        res
          .status(401)
          .json({ success: false, message: "Not authorized, token missing" });
        return;
      }

      // Verify token using your secret key
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string);

      (req as any).user = decoded;
      (req as any).admin = decoded;

      next();
    } catch (error: any) {
      console.error("JWT Verification Error Details:", error.message);

      res.status(401).json({
        success: false,
        message: `Not authorized, token failed: ${error.message}`,
      });
    }
  } else {
    res.status(401).json({
      success: false,
      message: "Not authorized, no token header found",
    });
  }
};
