import { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/api-error";
import { HttpStatusCodes } from "../utils/http-status-codes";
import { Messages } from "../utils/messages";
import { JwtWrapper } from "../utils/jwt-wrapper";
import { Constants } from "../constants";

export const verifyJWT = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.header("Authorization");
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new ApiError(HttpStatusCodes.BAD_REQUEST, Messages.AUTH.TOKEN_MISSING);
    }

    const token = authHeader.split(' ')[1]?.trim();
    if (!token) {
      throw new ApiError(HttpStatusCodes.BAD_REQUEST, Messages.AUTH.TOKEN_MISSING);
    }

    const secretKey = process.env.JWT_SECRET_KEY || Constants.JWT_SECRET_KEY;
    if (!secretKey) {
      throw new ApiError(HttpStatusCodes.INTERNAL_SERVER_ERROR, "JWT secret not configured");
    }

    let decode;
    try {
      decode = JwtWrapper.verify(token, secretKey);
    } catch (error: any) {
      if (error.name === 'TokenExpiredError') {
        throw new ApiError(HttpStatusCodes.UNAUTHORIZED, Messages.AUTH.TOKEN_EXPIRED);
      }
      throw new ApiError(HttpStatusCodes.UNAUTHORIZED, Messages.AUTH.TOKEN_INVALID);
    }

    if (!decode || typeof decode !== 'object') {
      throw new ApiError(HttpStatusCodes.UNAUTHORIZED, Messages.AUTH.TOKEN_INVALID);
    }

    const { id, roleId } = decode as { id: string; roleId: string };
    if (!id || !roleId) {
      throw new ApiError(HttpStatusCodes.UNAUTHORIZED, Messages.AUTH.TOKEN_INVALID);
    }

    req.user = { id, roleId };

    next();
  } catch (error) {
    // console.error("JWT verification failed: ", error);
    next(error);
  }
};
