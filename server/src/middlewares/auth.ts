import JWT from "../utils/jwt";
import type { Response, NextFunction } from "express";
import type { CustomRequest, User } from "../types/types";
import { logger } from "../configs/logger";
import httpStatus from "http-status";

export const requiredAuth = (req: CustomRequest, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      res
        .status(httpStatus.UNAUTHORIZED)
        .json({ error: "Unauthorized. Auth header not set" });
      return;
    }

    const token = authHeader?.split("Bearer ")[1];

    if (!token) {
      res
        .status(httpStatus.NOT_IMPLEMENTED)
        .json({ error: "Token not set" });
      return;
    }

    const decodedUser = JWT.verify(token as string);
    req.user = decodedUser as User;
    next();
  } catch (error: any) {
    logger.error(`Error in the middleware: ${error.message}`);

    if (error.message === "TokenExpiredError") {
      res
        .status(httpStatus.BAD_REQUEST)
        .json({ error: "Token expired" });
      return;
    }

    res
      .status(httpStatus.BAD_REQUEST)
      .json({ error: "Invalid Token" });
  }
};
